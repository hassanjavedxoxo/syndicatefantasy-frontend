import React, { useEffect, useState } from 'react'
import style from '../style/StartAndSit.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Loader from '../components/Loader'
function StartAndSit() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true)
        axios.get('http://localhost:5000/api/webscrap/start&sit')
        .then((res) => {
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
            return item.player.toLowerCase().includes(searchQuery) || 
                   item.opponent.toLowerCase().includes(searchQuery);
        });
        setFilterData(filtered);
    }

    return (
        <>
        {loader ? <Loader/> : null}
            <Navbar />
            <div className={`${style.matchupMain} container-fluid p-0 mt-3 mb-5`}>
                <input onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())} type="text" className={`${style.searchPlayer} mb-5 px-3`} placeholder='Enter player name' />



                <div className={`${style.rankingCont}`}>

                    <table className={`table ${style.rankingTable}`}>
                        <thead>
                            <tr>
                                <th>TEAM</th>
                                <th>POS</th>
                                <th>RECEIVER</th>
                                <th>ADVANTAGE</th>
                                <th>TEAM</th>
                                <th>POS</th>
                                <th>DEFENDER</th>
                                <th>RECOMENTATION</th>

                            </tr>

                        </thead>
                        <tbody>
                            {loader ? (
                                <tr><td colSpan={6}>LOADING...</td></tr>
                            ) : (
                                (filterData || data || []).map((value, index) => (
                                    <tr key={value.id || index}>
                                        <td>{value.team}</td>
                                        <td>{value.position}</td>
                                        <td>{value.player}</td>
                                        <td style={{backgroundColor:`${value.matchup2.color}`,color:'black'}}>{value.matchup2.value}</td>
                                        <td>{value.opp_team}</td>
                                        <td>{value.opp_position}</td>
                                        <td>{value.opponent}</td>
                                        {value.recommendation === 'Neutral' ? <td style={{backgroundColor: `blue`}}>{value.recommendation}</td> : null}
                                        {value.recommendation === 'Sit' ? <td style={{backgroundColor: `red`}}>{value.recommendation}</td> : null}
                                        {value.recommendation === 'Start' ? <td style={{backgroundColor: `green`}}>{value.recommendation}</td> : null}
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

export default StartAndSit