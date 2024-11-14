import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/Ranking.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function Ranking() {
    const [data, setData] = useState(null);
    const [filterDataState, setFilterDataState] = useState(null);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    const [isSuperflexChecked, setIsSuperflexChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query

    useEffect(() => {
        // Call the API on component load or when category or isSuperflexChecked changes
        const fetchData = async () => {
            setLoading(true);
            try {
                let endpoint;
                if (category === 'dynasty-ranking') {
                    endpoint = isSuperflexChecked ? 'dynasty-ranking/superflex' : 'dynasty-ranking/all';
                } else if (category === 'dynasty-rookie-ranking') {
                    endpoint = isSuperflexChecked ? 'dynasty-rookie-ranking/superflex' : 'dynasty-rookie-ranking/all';
                } else if (category === 'redraft-ranking') {
                    endpoint = isSuperflexChecked ? 'redraft-ranking/superflex' : 'redraft-ranking/all';
                }

                if (endpoint) {
                    const response = await axios.get(`http://localhost:5000/api/${endpoint}`);
                    setData(response.data);
                    setFilterDataState(response.data); // Set initial filter state to the full data
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true); // Set loading to false after data fetch is complete
            }
        };

        fetchData();
    }, [category, isSuperflexChecked]);

    const filterData = (position) => {
        setFilterDataState(position === 'ALL' ? data : data.filter(item => item.position === position));
    };

    const handleSuperflexChange = (event) => {
        setIsSuperflexChecked(event.target.checked);
        setWhichButtonClicked('ALL');
    };

    const [whichButtonClicked, setWhichButtonClicked] = useState('ALL');

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilterDataState(
            data.filter((item) => item.name.toLowerCase().includes(query)) // Filter based on name
        );
    };

    return (
        <>
        {loading ? <Loader/> : null}
            <Navbar />
            <div className={`${style.rankingMain} container-fluid p-0`}>

                <h2 className="mb-4">{category.replace(/-/g, ' ').toUpperCase()}</h2>
                <input
                    type="text"
                    className={style.searchPlayer}
                    placeholder="Search..."
                    value={searchQuery} // Bind the input value to searchQuery
                    onChange={handleSearchChange} // Handle input change
                />
                <div className="row mt-4 mb-2" style={{ width: '100%' }}>
                    <div className="col-auto my-3">
                        <button
                            className={whichButtonClicked === 'ALL' ? style.positionButtonSelected : style.positionButton}
                            onClick={() => {
                                filterData('ALL');
                                setWhichButtonClicked('ALL');
                            }}
                        >
                            ALL
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button
                            className={whichButtonClicked === 'QB' ? style.positionButtonSelected : style.positionButton}
                            onClick={() => {
                                filterData('QB');
                                setWhichButtonClicked('QB');
                            }}
                        >
                            QB
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button
                            className={whichButtonClicked === 'RB' ? style.positionButtonSelected : style.positionButton}
                            onClick={() => {
                                filterData('RB');
                                setWhichButtonClicked('RB');
                            }}
                        >
                            RB
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button
                            className={whichButtonClicked === 'WR' ? style.positionButtonSelected : style.positionButton}
                            onClick={() => {
                                filterData('WR');
                                setWhichButtonClicked('WR');
                            }}
                        >
                            WR
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button
                            className={whichButtonClicked === 'TE' ? style.positionButtonSelected : style.positionButton}
                            onClick={() => {
                                filterData('TE');
                                setWhichButtonClicked('TE');
                            }}
                        >
                            TE
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <p className={style.positionButton} style={{ width: 'auto', border: 'solid transparent 2px' }}>
                            SUPERFLEX
                            <span className='pl-2'>
                                <input
                                    onChange={handleSuperflexChange}
                                    type="checkbox"
                                    checked={isSuperflexChecked}
                                />
                            </span>
                        </p>
                    </div>
                </div>

                <div className={`${style.rankingCont}`}>

                    <table className={`table ${style.rankingTable}`}>
                        <thead>
                            <tr>
                                <th scope="col">RANK</th>
                                <th scope="col">NAME</th>
                                <th scope="col">TEAM</th>
                                <th scope="col">POSITION</th>
                                <th scope="col">AGE</th>
                                <th scope="col">VALUE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6}>LOADING...</td></tr>
                            ) : (
                                (filterDataState || data || []).map((value, index) => (
                                    <tr key={value.id || index}>
                                        <td>{value.rank || index + 1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.team}</td>
                                        <td>{value.position}</td>
                                        <td>{value.maybeAge}</td>
                                        <td>{value.value}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Ranking;