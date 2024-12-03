import React, { useEffect, useState } from 'react'
import style from '../style/Projection.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
function Projection() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loader, setLoader] = useState(false);

  const [category, setCategory] = useState('PPR')

  useEffect(() => {
    setLoader(true)
    axios.get(`http://46.202.178.195:5000/api/webscrap/projection/${category}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFilterData(res.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoader(false);
      })
  }, [category])

  useEffect(() => {
    filterForSearch();
  }, [searchQuery])

  const filterForSearch = (e) => {
    const filtered = data.filter((item) => {
      return item.playerName.toLowerCase().includes(searchQuery);
    });
    setFilterData(filtered);
  }

  const navigate = useNavigate();
  const goToAddBlogPage = () => navigate('/adminaddblog');
    const goToAddYoutubePage = () => navigate('/adminaddyoutubepost');
    const goToProjectedPoints = () => navigate('/projection');
    const goToPastProductions = () => navigate('/pastproduction');
    const goToBettingData = () => navigate('/bettingdata');

  return (
    <>
      {loader ? <Loader /> : null}
      <Navbar />
      <div className={`${style.matchupMain} container-fluid p-0 mt-3 mb-5`}>
      <div className="row mb-3">
      <div className="col-auto my-3">
            <button onClick={() => navigate('/admin')} className={style.adminNavigate}>ADMIN HOME</button>
          </div>
                    <div className="col-auto my-3">
                        <button onClick={goToAddBlogPage} className={style.adminNavigate}>ADD BLOG</button>
                    </div>
                    <div className="col-auto my-3">
                        <button onClick={goToAddYoutubePage} className={style.adminNavigate}>ADD YOUTUBE POST</button>
                    </div>
                    <div className="col-auto my-3">
                        <button onClick={goToProjectedPoints} className={style.adminNavigate}>PROJECTED POINTS</button>
                    </div>
                    <div className="col-auto my-3">
                        <button onClick={goToPastProductions} className={style.adminNavigate}>PAST PRODUCTIONS</button>
                    </div>
                    <div className="col-auto my-3">
                        <button onClick={goToBettingData} className={style.adminNavigate}>BETTING DATA</button>
                    </div>
                </div>
        <input onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())} type="text" className={`${style.searchPlayer} mb-5 px-3`} placeholder='Enter player name' />

        <div className={`${style.buttonDiv}`}>
          <button className={`${category === 'PPR' ? style.pprClicked : style.ppr}`} onClick={() => { setCategory('PPR') }}>PPR</button>
          <button className={`${category === 'HALF' ? style.halfPprClicked : style.halfPpr}`} onClick={() => { setCategory('HALF') }}>HALF PPR</button>
          <button className={`${category === 'STD' ? style.standardClicked : style.standard}`} onClick={() => { setCategory('STD') }}>STANDARD</button>
        </div>


        <div className={`${style.rankingCont}`}>

          <table className={`table ${style.rankingTable}`}>
            <thead>
              <tr>
                <th style={{ color: 'green' }}>PLAYER NAME</th>
                <th>POS</th>
                <th>RUSHING ATT</th>
                <th>RUSHING YDS</th>
                <th>RUSHING TDS</th>
                <th>RECEIVING REC</th>
                <th>RECEIVING YDS</th>
                <th>RECEIVING TDS</th>
                <th>FL</th>
                <th>FPTS</th>

              </tr>

            </thead>
            <tbody>
              {loader ? (
                <tr><td colSpan={6}>LOADING...</td></tr>
              ) : (
                (filterData || data || []).map((value, index) => (
                  <tr key={index}>
                    <td style={{ color: 'green' }}>{value.playerName}</td>
                    <td>{value.position}</td>
                    <td>{value.metric1 || 0}</td>
                    <td>{value.metric2 || 0}</td>
                    <td>{value.metric3 || 0}</td>
                    <td>{value.metric4 || 0}</td>
                    <td>{value.metric5 || 0}</td>
                    <td>{value.metric6 || 0}</td>
                    <td>{value.matchup1 || 0}</td>
                    <td>{value.matchup2 || 0}</td>




                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Projection