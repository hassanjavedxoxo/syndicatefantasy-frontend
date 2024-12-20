import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/Ranking.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import MyLeagueComponent from '../components/MyLeagueComponent';

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
                } else if (category === 'KeepTradeCut') {
                    endpoint = 'webscrap/ktc'
                } else if (category === 'DynastyProcess') {
                    endpoint = 'webscrap/DynastyProcess'
                }

                if (endpoint) {
                    const response = await axios.get(`http://46.202.178.195:5000/api/${endpoint}`);

                    setData(response.data);
                    console.log(response.data);

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

    const [whichButtonClicked, setWhichButtonClicked] = useState('');

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilterDataState(
            data.filter((item) => item.name.toLowerCase().includes(query)) // Filter based on name
        );
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (category !== 'dynasty-rookie-ranking') {
            setWhichButtonClicked('ALL');
        }
    }, [category]);


    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar />
            <div className={`${style.rankingMain} container-fluid p-0`}>

                <h2 className="mb-4">{category.replace(/-/g, ' ').toUpperCase()}</h2>
                <MyLeagueComponent /> <br />
                <input
                    type="text"
                    className={`${style.searchPlayer} mt-4`}
                    placeholder="Search..."
                    value={searchQuery} // Bind the input value to searchQuery
                    onChange={handleSearchChange} // Handle input change
                />
                <div className='row mt-2'>

                    {
                        category === 'KeepTradeCut' || category === 'DynastyProcess' ? null :
                            <div className="col-auto my-3">

                                {category === 'DynastyProcess' ? null : <h2>Superflex <span><label class={`${style.switch}`}>
                                    <input type="checkbox" onClick={() => { setIsSuperflexChecked(!isSuperflexChecked); return handleSuperflexChange; }} />
                                    <span class={`${style.slider} ${style.round}`}></span>
                                </label></span></h2>}
                            </div>
                    }
                </div>
                <div className="row mb-2" style={{ width: '100%' }}>
                    <div className="col-auto my-3">
                        <button style={{ width: 'auto' }} onClick={() => navigate('/ranking/dynasty-ranking')}
                            className={category === 'dynasty-ranking' ? style.positionButtonSelected : style.positionButton}
                        >
                            Fantasy Calc
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button style={{ width: 'auto' }} onClick={() => navigate('/ranking/KeepTradeCut')}
                            className={category === 'KeepTradeCut' ? style.positionButtonSelected : style.positionButton}
                        >
                            KeepTradeCut
                        </button>
                    </div>
                    <div className="col-auto my-3">
                        <button style={{ width: 'auto' }} onClick={() => { navigate('/ranking/DynastyProcess'); setIsSuperflexChecked(false) }}
                            className={category === 'DynastyProcess' ? style.positionButtonSelected : style.positionButton}
                        >
                            Dynasty Process
                        </button>
                    </div>
                </div>


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
                    {
                        category === 'dynasty-ranking' || category === 'dynasty-rookie-ranking' || category === 'redraft-ranking' ? <div className="col-auto my-3">
                            <button
                                style={{ width: 'auto' }}
                                className={category === 'dynasty-rookie-ranking' ? style.positionButtonSelected : style.positionButton}
                                onClick={() => {
                                    navigate('/ranking/dynasty-rookie-ranking')
                                    setWhichButtonClicked('');
                                }}
                            >
                                ROOKIE
                            </button>
                        </div> : null
                    }
                    {
                        category === 'dynasty-ranking' || category === 'dynasty-rookie-ranking' || category === 'redraft-ranking' ? <div className="col-auto my-3">
                            <button
                                style={{ width: 'auto' }}
                                className={category === 'dynasty-ranking' ? style.positionButtonSelected : style.positionButton}
                                onClick={() => {
                                    navigate('/ranking/dynasty-ranking')
                                    setWhichButtonClicked('');
                                }}
                            >
                                DYNASTY
                            </button>
                        </div> : null
                    }

{
                        category === 'dynasty-ranking' || category === 'dynasty-rookie-ranking' || category === 'redraft-ranking' ? <div className="col-auto my-3">
                            <button
                                style={{ width: 'auto' }}
                                className={category === 'redraft-ranking' ? style.positionButtonSelected : style.positionButton}
                                onClick={() => {
                                    navigate('/ranking/redraft-ranking')
                                    setWhichButtonClicked('');
                                }}
                            >
                                REDRAFT
                            </button>
                        </div> : null
                    }




                </div>

                <div className={`${style.rankingCont}`}>

                    <table className={`table ${style.rankingTable}`}>
                        <thead>
                            <tr>
                                <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">{category === 'KeepTradeCut' || category === 'DynastyProcess' ? 'SERIAL NO.' : 'RANK'}</th>
                                <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">NAME</th>
                                {
                                    category === 'DynastyProcess' ? null :
                                        <>
                                            <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">TEAM</th>
                                            <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">POSITION</th>
                                        </>
                                }
                                {
                                    category === 'DynastyProcess' ? null :
                                        <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">AGE</th>
                                }

                                {
                                    category === 'KeepTradeCut' ?
                                        <th style={{ borderInline: 'none', borderBottom: 'none' }} scope="col">30 DAYS TREND</th> : null
                                }
                                <th scope="col" style={{ borderInline: 'none', borderBottom: 'none' }}>VALUE</th>
                                {
                                    category === 'KeepTradeCut' ? <th scope="col" style={{ borderInline: 'none', borderBottom: 'none' }}>SUPERFLEX VALUE</th> : null
                                }


                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td style={{ borderInline: 'none' }} colSpan={6}>LOADING...</td></tr>
                            ) : (
                                (filterDataState || data || []).map((value, index) => (
                                    <tr key={value.id || index}>
                                        <td style={{ borderInline: 'none' }}>{value.rank || index + 1}</td>
                                        <td style={{ borderInline: 'none' }}>{value.name}</td>
                                        {
                                            category === 'DynastyProcess' ? null :
                                                <>
                                                    <td style={{ color: 'green', borderInline: 'none' }}>{value.team}</td>
                                                    <td style={{
                                                        color: value.position === 'QB' ? 'orange' :
                                                            value.position === 'WR' ? 'red' :
                                                                value.position === 'RB' ? 'blue' :
                                                                    value.position === 'TE' ? 'yellow' :
                                                                        'white', borderInline: 'none'
                                                    }}>
                                                        {value.position}
                                                    </td>
                                                </>
                                        }
                                        {
                                            category === 'DynastyProcess' ? null :
                                                <td style={{ borderInline: 'none' }}>{category === 'KeepTradeCut' ? value.age : value.maybeAge}</td>
                                        }
                                        {
                                            category === 'KeepTradeCut' ? (
                                                value.trend && value.trend.includes('green:') ? (
                                                    <td style={{ color: 'green', borderInline: 'none' }}>
                                                        <i className="fa-solid fa-caret-up"></i>{' '}
                                                        {value.trend.replace('green:', '')}
                                                    </td>
                                                ) : value.trend && value.trend.includes('red:') ? (
                                                    <td style={{ color: 'red', borderInline: 'none' }}>
                                                        <i className="fa-solid fa-caret-down"></i>{' '}
                                                        {value.trend.replace('red:', '')}
                                                    </td>
                                                ) : (
                                                    <td style={{ borderInline: 'none' }}>--</td> // Placeholder for missing trend data
                                                )
                                            ) : null

                                        }

                                        {isSuperflexChecked ? <td style={{ borderInline: 'none' }}>{value.superflexValue}</td> : <td style={{ borderInline: 'none' }}>{value.value}</td>}
                                        {/* <td>{value.value}</td> */}
                                        {
                                            category === 'KeepTradeCut' ? <td style={{ borderInline: 'none' }}>{value.superflexValue}</td> : null
                                        }
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
