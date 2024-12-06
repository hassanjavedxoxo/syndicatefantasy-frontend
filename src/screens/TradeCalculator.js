import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/TradeCalculator.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import MyLeagueComponent from '../components/MyLeagueComponent';

function TradeCalculator() {
    const [data, setData] = useState([]);
    const [team1SearchTerm, setTeam1SearchTerm] = useState('');
    const [team2SearchTerm, setTeam2SearchTerm] = useState('');
    const [team1FilteredData, setTeam1FilteredData] = useState([]);
    const [team2FilteredData, setTeam2FilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

    const [isSuperflex, setIsSuperflex] = useState(false);

    const [recommendedPlayers, setRecommendedPlayers] = useState([]);


    useEffect(() => {
        setTeamOneData([]);
        setTeamTwoData([]);
        setTeamOnePlayerValue(0);
        setTeamTwoPlayerValue(0);
        const fetchData = async () => {
            setLoading(true);
            try {
                let endpoint;
                if (category === 'KeepTradeCut') {
                    endpoint = 'webscrap/ktc';
                } else if (category === 'DynastyProcess') {
                    endpoint = 'webscrap/dynastyprocess'
                } else if (category === 'DynastyRanking') {
                    endpoint = 'dynasty-ranking/all'
                } else if (category === 'DynastyRookieRanking') {
                    endpoint = 'dynasty-rookie-ranking/all'
                } else if (category === 'RedraftRanking') {
                    endpoint = 'redraft-ranking/all'
                }

                if (endpoint) {
                    const response = await axios.get(`http://46.202.178.195:5000/api/${endpoint}`);
                    setData(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const handleTeam1InputChange = (e) => {
        const value = e.target.value;
        setTeam1SearchTerm(value);

        if (value) {
            const filtered = data.filter((player) =>
                player.name.toLowerCase().includes(value.toLowerCase()) &&
                !teamOneData.find(p => p.name === player.name) // Exclude already added players
            );
            setTeam1FilteredData(filtered);
        } else {
            setTeam1FilteredData([]);
        }
    };

    const handleTeam2InputChange = (e) => {
        const value = e.target.value;
        setTeam2SearchTerm(value);

        if (value) {
            const filtered = data.filter((player) =>
                player.name.toLowerCase().includes(value.toLowerCase()) &&
                !teamTwoData.find(p => p.name === player.name) // Exclude already added players
            );
            setTeam2FilteredData(filtered);
        } else {
            setTeam2FilteredData([]);
        }
    };

    const [teamOneData, setTeamOneData] = useState([]);
    const [teamTwoData, setTeamTwoData] = useState([]);

    const [teamOnePlayerValue, setTeamOnePlayerValue] = useState(0);
    const [teamTwoPlayerValue, setTeamTwoPlayerValue] = useState(0);

    const addToTeamOne = (item) => {
        if (!teamOneData.find(player => player.name === item.name)) { // Check if player is already added
            setTeamOneData((allItems) => [...allItems, item]);
            setTeam1SearchTerm('');
            setTeam1FilteredData([]);
            isSuperflex ? setTeamOnePlayerValue(prev => prev + item.superflexValue)
                : setTeamOnePlayerValue(prev => prev + item.value);
        }
    };

    const addToTeamTwo = (item) => {
        if (!teamTwoData.find(player => player.name === item.name)) { // Check if player is already added
            setTeamTwoData((allItems) => [...allItems, item]);
            setTeam2SearchTerm('');
            setTeam2FilteredData([]);
            isSuperflex ? setTeamTwoPlayerValue(prev => prev + item.superflexValue)
                : setTeamTwoPlayerValue(prev => prev + item.value);
        }
    };

    const removeFromTeamOne = (item) => {
        setTeamOneData((allItems) => allItems.filter(player => player.name !== item.name));
        isSuperflex ? setTeamOnePlayerValue(prev => prev - item.superflexValue)
            : setTeamOnePlayerValue(prev => prev - item.value);
    };

    const removeFromTeamTwo = (item) => {
        setTeamTwoData((allItems) => allItems.filter(player => player.name !== item.name));
        isSuperflex ? setTeamTwoPlayerValue(prev => prev - item.superflexValue)
            : setTeamTwoPlayerValue(prev => prev - item.value);
    };

    useEffect(() => {
        updateIndicator();
    }, [teamOnePlayerValue]);

    useEffect(() => {
        updateIndicator();
    }, [teamTwoPlayerValue]);

    useEffect(() => {
        setTeamOneData([]);
        setTeamTwoData([]);
        setTeamOnePlayerValue(0);
        setTeamTwoPlayerValue(0);
        if (category === 'DynastyRanking' && isSuperflex) {
            setLoading(true)
            axios.get(`http://46.202.178.195:5000/api/dynasty-ranking/superflex`)
                .then((response) => {
                    setData(response.data);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                })
        } else if (category === 'DynastyRookieRanking' && isSuperflex) {
            setLoading(true)
            axios.get(`http://46.202.178.195:5000/api/dynasty-rookie-ranking/superflex`)
                .then((response) => {
                    setData(response.data);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                })
        } else if (category === 'RedraftRanking' && isSuperflex) {
            setLoading(true)
            axios.get(`http://46.202.178.195:5000/api/redraft-ranking/superflex`)
                .then((response) => {
                    setData(response.data);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                })
        }
    }, [isSuperflex]);

    const [indicator, setIndicator] = useState('');

    const updateIndicator = () => {
        if (teamOnePlayerValue - teamTwoPlayerValue < 201 && teamOnePlayerValue - teamTwoPlayerValue > -1) {
            setIndicator('green');
        } else if (teamOnePlayerValue - teamTwoPlayerValue > -201 && teamOnePlayerValue - teamTwoPlayerValue < 1) {
            setIndicator('green');
        } else if (teamOnePlayerValue - teamTwoPlayerValue < 501 && teamOnePlayerValue - teamTwoPlayerValue > 100) {
            setIndicator('yellowR');
        } else if (teamOnePlayerValue - teamTwoPlayerValue > -501 && teamOnePlayerValue - teamTwoPlayerValue < 101) {
            setIndicator('yellowL');
        } else if (teamOnePlayerValue - teamTwoPlayerValue > 500) {
            setIndicator('redR');
        } else if (teamOnePlayerValue - teamTwoPlayerValue < -500) {
            setIndicator('redL');
        }
    };

    const navigate = useNavigate();
    const changePlatform = (e) => {
        navigate('/trade/' + e.target.value);
    };
    const calculateRecommendations = () => {
        const valueDifference = teamOnePlayerValue - teamTwoPlayerValue;

        if (Math.abs(valueDifference) > 200) {
            const playersForTeamTwo = data.filter(player => {
                const playerValue = isSuperflex ? player.superflexValue : player.value;
                return playerValue >= Math.abs(valueDifference) - 200 && playerValue <= Math.abs(valueDifference) + 200;
            });

            const playersForTeamOne = data.filter(player => {
                const playerValue = isSuperflex ? player.superflexValue : player.value;
                return playerValue <= Math.abs(valueDifference) + 200 && playerValue >= Math.abs(valueDifference) - 200;
            });

            if (valueDifference > 200) {
                // Team 2 needs more value
                setRecommendedPlayers(playersForTeamTwo);
            } else if (valueDifference < -200) {
                // Team 1 needs more value
                setRecommendedPlayers(playersForTeamOne);
            }
        } else {
            setRecommendedPlayers([]); // Reset if the trade is already fair
        }
    };


    useEffect(() => {
        calculateRecommendations();
    }, [teamOnePlayerValue, teamTwoPlayerValue, isSuperflex]);


    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar />
            <div className={`${style.tradeMain} container-fluid p-0`}>
                <h2 className="mb-4">TRADE CALCULATOR</h2>
                <MyLeagueComponent /> <br />
                {category === 'DynastyProcess' ? null : <h3 className='mt-4'>Superflex <span><label class={`${style.switch}`}>
                    <input type="checkbox" onClick={() => setIsSuperflex(!isSuperflex)} />
                    <span class={`${style.slider} ${style.round}`}></span>
                </label></span></h3>}

                <select onChange={(e) => changePlatform(e)} name="" id="" className={style.platformSelect}>
                    <option value="KeepTradeCut">KeepTradeCut</option>
                    <option value="DynastyProcess">Dynasty Process</option>
                    <option value="DynastyRanking">Dynasty Ranking</option>
                    <option value="DynastyRookieRanking">Dynasty Rookie Ranking</option>
                    <option value="RedraftRanking">Redraft Ranking</option>
                </select>
                <div className="row">
                    {/* Team 1 */}
                    <div className="col-md-6">
                        <div className={`container ${style.teamCont}`}>
                            <h2 className="text-center py-4">TEAM 1</h2>
                            <input
                                type="text"
                                placeholder="Enter player name..."
                                value={team1SearchTerm}
                                onChange={handleTeam1InputChange}
                                className="mb-4"
                            /><br />
                            <div>
                                {team1FilteredData.length > 0 && team1FilteredData.map((player, index) => (
                                    <button
                                        key={index}
                                        className={style.playerNames}
                                        onClick={() => addToTeamOne(player)}
                                    >
                                        {player.name}
                                    </button>
                                ))}
                            </div>
                            <div className={style.teamOneCont}>
                                {
                                    teamOneData.map((value, index) => (
                                        <p
                                            className='pl-3'
                                            key={index}
                                            style={{
                                                background: 'rgb(16, 239, 16)',
                                                position: 'relative',
                                                color: 'black',
                                                width: '70%',
                                                borderRadius: '5px',
                                                height: '30px',
                                                alignItems: 'center',
                                                display: 'flex',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                paddingRight: '60px', // Add padding to prevent overlap with the button
                                                whiteSpace: 'nowrap', // Prevent text wrapping
                                                overflow: 'hidden', // Hide overflow
                                                textOverflow: 'ellipsis', // Show ellipsis for overflowing text
                                            }}
                                        >
                                            {value.name} - {isSuperflex ? value.superflexValue : value.value}
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    right: '0',
                                                    height: '100%',
                                                    border: 'none',
                                                    background: 'red',
                                                    color: 'white',
                                                    borderTopRightRadius: '5px',
                                                    borderBottomRightRadius: '5px',
                                                    width: '60px', // Fixed width for the button
                                                }}
                                                className={`${style.removeButton}`}
                                                onClick={() => removeFromTeamOne(value)}
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </p>

                                    ))
                                }
                                <p className={`text-center`}>TOTAL VALUE: {teamOnePlayerValue}</p>
                            </div>
                        </div>
                    </div>
                    {/* Team 2 */}
                    <div className="col-md-6">
                        <div className={`container ${style.teamCont}`}>
                            <h2 className="text-center py-4">TEAM 2</h2>
                            <input
                                type="text"
                                placeholder="Enter player name..."
                                value={team2SearchTerm}
                                onChange={handleTeam2InputChange}
                                className="mb-4"
                            /><br />
                            <div>
                                {team2FilteredData.length > 0 && team2FilteredData.map((player, index) => (
                                    <button

                                        key={index}
                                        className={style.playerNames}
                                        onClick={() => addToTeamTwo(player)}
                                    >
                                        {player.name}
                                    </button>
                                ))}
                            </div>
                            <div className={style.teamTwoCont}>
                                {
                                    teamTwoData.map((value, index) => (
                                        <p key={index} className='pl-3' style={{ background: 'rgb(16, 239, 16)', position: 'relative', color: 'black', width: '70%', borderRadius: '5px', height: '30px', alignItems: 'center', display: 'flex', left: '50%', transform: 'translateX(-50%)' }}>
                                            {value.name} - {isSuperflex ? value.superflexValue : value.value}
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    right: '0',
                                                    height: '100%',
                                                    border: 'none',
                                                    background: 'red',
                                                    color: 'white',
                                                    borderTopRightRadius: '5px',
                                                    borderBottomRightRadius: '5px',
                                                    width: '60px', // Fixed width for the button
                                                }}
                                                className={`${style.removeButton}`}
                                                onClick={() => removeFromTeamTwo(value)}
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </p>
                                    ))
                                }
                                <p className={`text-center`}>TOTAL VALUE: {teamTwoPlayerValue}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bar}>
                    <div className={`${style.redL}`}><div style={{ display: `${indicator === 'redL' ? 'block' : 'none'}` }} className={`${style.indicatorRedL}`}></div></div>
                    <div className={`${style.yellowL}`}><div style={{ display: `${indicator === 'yellowL' ? 'block' : 'none'}` }} className={`${style.indicatorYellowL}`}></div></div>
                    <div className={`${style.green}`}><div style={{ display: `${indicator === 'green' ? 'block' : 'none'}` }} className={`${style.indicatorGreen}`}></div></div>
                    <div className={`${style.redR}`}><div style={{ display: `${indicator === 'redR' ? 'block' : 'none'}` }} className={`${style.indicatorRedR}`}></div></div>
                    <div className={`${style.yellowR}`}><div style={{ display: `${indicator === 'yellowR' ? 'block' : 'none'}` }} className={`${style.indicatorYellowR}`}></div></div>
                </div>

                {
                    teamOnePlayerValue - teamTwoPlayerValue < 201 && teamOnePlayerValue - teamTwoPlayerValue > -201
                        ?
                        <h3 className='text-center text-success'>Fair Trade. Point Difference: {Math.abs(teamOnePlayerValue - teamTwoPlayerValue)}</h3>
                        :
                        null

                }

                {
                    teamOnePlayerValue - teamTwoPlayerValue > 200
                        ?
                        <h3 className='text-center text-danger'>Unfair Trade. Point missing from team 2: {Math.abs(teamOnePlayerValue - teamTwoPlayerValue)}</h3>
                        :
                        null

                }

                {
                    teamOnePlayerValue - teamTwoPlayerValue < -200
                        ?
                        <h3 className='text-center text-danger'>Unfair Trade. Point missing from team 1: {Math.abs(teamOnePlayerValue - teamTwoPlayerValue)}</h3>
                        :
                        null

                }

                <div className={`container mt-4 ${style.recommendationBox}`}>
                    <h3 className='text-center'>Recommendations to Balance Trade</h3>
                    {recommendedPlayers.length > 0 ? (
                        <table>
                            <tbody>
                                {recommendedPlayers.map((player, index) => {
                                    const localValueDifference = teamOnePlayerValue - teamTwoPlayerValue;
                                    return (


                                        <tr>
                                            <td>{player.name} - {isSuperflex ? player.superflexValue : player.value}</td>
                                            <td><button
                                                onClick={() =>
                                                    localValueDifference > 200
                                                        ? addToTeamTwo(player)
                                                        : addToTeamOne(player)
                                                }
                                                className="btn btn-primary ml-2"
                                            >
                                                Add
                                            </button></td>
                                        </tr>





                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center'>No recommendations available. The trade is fair.</p>
                    )}
                </div>

                <p className={`text-center mt-4 ${style.tradeInfo}`}>The Trade Calculator is your go-to tool when you are wondering about trades and need some help. It’s designed to give you a clear picture of the fairness of potential trades, helping you make decisions with confidence.</p>
                <p className={`text-center ${style.tradeInfo}`}>Here’s the magic behind it: Each player gets a numerical value based on their performance, position, age, and other relevant stats. These values are then adjusted using a special formula based on position, player value, and other factors to consider fairness. The calculator adds up the adjusted values of all players for each team to get a total value. Using the adjusted values, the trade will be considered fair if the two teams are within a 10% absolute point threshold of each other. The points will tell you which team is favored in the trade, but this is simply a way to guide you. </p>
                <p className={`text-center ${style.tradeInfo}`}>But remember, while the Trade Calculator is a helpful tool, it’s not the be-all and end-all. Factors like team needs, player potential, and risk tolerance can all influence how a trade is perceived. So, use the calculator as a guide, but trust your judgment.</p>
                <p className={`text-center ${style.tradeInfo}`}>After all, you’re the mastermind behind your team. The Trade Calculator is just here to lend a helping hand!</p>
            </div>
            <Footer />
        </>
    );
}

export default TradeCalculator;
