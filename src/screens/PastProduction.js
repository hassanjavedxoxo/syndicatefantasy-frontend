import React, { useEffect, useState } from 'react'
import style from '../style/PastProduction.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
function PastProduction() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)
    axios.get(`http://46.202.178.195:5000/api/webscrap/pastproduction/`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFilterData(res.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoader(false);
      })
  }, [])

  useEffect(() => {
    filterForSearch();
  }, [searchQuery])

  const filterForSearch = (e) => {
    const filtered = data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery);
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
        <input onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())} type="text" className={`${style.searchPlayer} mb-5 px-3`} placeholder='Enter player name' />



        <div className={`${style.rankingCont}`}>
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

          <table className={`table ${style.rankingTable}`}>
            <thead>
              <tr>
                <th>RANK</th>
                <th>PLAYER NAME</th>
                <th>POS</th>
                <th>TEAM</th>
                {
                    (filterData[0]?.stats || data[0]?.stats || []).map((_, index) => {
                        return <th key={index}>{index + 1}</th>;
                    })
                }
                <th>AVG</th>
                <th>TTL</th>

              </tr>

            </thead>
            <tbody>
              {loader ? (
                <tr><td colSpan={6}>LOADING...</td></tr>
              ) : (
                (filterData || data || []).map((value, index) => (
                  <tr key={index}>
                    <td>{value.rank}</td>
                    
                    <td>{value.name || 0}</td>
                    <td>{value.position || 0}</td>
                    <td>{value.team || 0}</td>
                    {
                        value.stats.map((value, index) => {
                            return <td key={index}>{value}</td>
                        })
                    }
                    <td>{value.avg || 0}</td>
                    <td>{value.total || 0}</td>




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

export default PastProduction