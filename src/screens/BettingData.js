import React, { useEffect, useState } from 'react'
import style from '../style/PastProduction.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
function BettingData() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)
    axios.get(`http://46.202.178.195:5000/api/webscrap/betting/`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoader(false);
      })
  }, [])
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
        <h2 style={{color:'green'}} className='mb-4'>BETTING DATA</h2>



        <div className={`${style.rankingCont}`}>

          <table className={`table ${style.rankingTable}`}>
            <thead>
              <tr>
                <th>SCHEDULED</th>
                <th>OPEN</th>
                <th className={style.bestOdds}>BESTODDS</th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/779359_BetMGM800x200@1x.png" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/256064_caesars_800x200.png" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/122955_FanDuelSportsBook@1x.jpg" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/128508_Primary1.png" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/115895_BetRivers384x96.png" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/115895_BetRivers384x96.png" alt="" /></th>
                <th><img className={style.bettingSources} src="https://assets.actionnetwork.com/676387_Bet365@1x.png" alt="" /></th>

              </tr>

            </thead>
            <tbody>
                {
                    !loader && data ? 
                    (data.map((value) => {
                        return <>
                            <tr>
                                <td>{value.teamName1}<br /><br />VS<br /><br />{value.teamName2}</td>
                                <td>{value.openSpread1}<br/>{value.openLine1}<br />-------<br />{value.openSpread2}<br/>{value.openLine2}</td>
                                <td style={{position:'relative'}}>{value.rowData.one.spread}<br />{value.rowData.one.line}<br />-------<br />{value.rowData.two.spread}<br />{value.rowData.two.line}<img className={style.bestOddsImg1} src={value.rowData.one.logo} alt="" /><img className={style.bestOddsImg2} src={value.rowData.two.logo} alt="" /></td>
                                <td>{value.rowData.three.spread}<br />{value.rowData.three.line}<br />-------<br />{value.rowData.four.spread}<br />{value.rowData.four.line}</td>
                                <td>{value.rowData.five.spread}<br />{value.rowData.five.line}<br />-------<br />{value.rowData.six.spread}<br />{value.rowData.six.line}</td>
                                <td>{value.rowData.seven.spread}<br />{value.rowData.seven.line}<br />-------<br />{value.rowData.eight.spread}<br />{value.rowData.eight.line}</td>
                                <td>{value.rowData.nine.spread}<br />{value.rowData.nine.line}<br />-------<br />{value.rowData.ten.spread}<br />{value.rowData.ten.line}</td>
                                <td>{value.rowData.eleven.spread}<br />{value.rowData.eleven.line}<br />-------<br />{value.rowData.twelve.spread}<br />{value.rowData.twelve.line}</td>
                                <td>{value.rowData.thirteen.spread}<br />{value.rowData.thirteen.line}<br />-------<br />{value.rowData.fourteen.spread}<br />{value.rowData.fourteen.line}</td>
                                <td>{value.rowData.fifteen.spread}<br />{value.rowData.fifteen.line}<br />-------<br />{value.rowData.sixteen.spread}<br />{value.rowData.sixteen.line}</td>
                            </tr>
                        </>
                    }))
                    : null
                }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BettingData;