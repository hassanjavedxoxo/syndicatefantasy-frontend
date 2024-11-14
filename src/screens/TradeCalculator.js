import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/TradeCalculator.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function TradeCalculator() {
    const [data, setData] = useState([]);
    const [team1SearchTerm, setTeam1SearchTerm] = useState('');
    const [team2SearchTerm, setTeam2SearchTerm] = useState('');
    const [team1FilteredData, setTeam1FilteredData] = useState([]);
    const [team2FilteredData, setTeam2FilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

    const [isSuperflex, setIsSupeflex] = useState(false);

    useEffect(() => {
        setTeamOneData([]);
        setTeamTwoData([]);
        setTeamOnePlayerValue(0);
        setTeamTwoPlayerValue(0);
        const fetchData = async () => {
            setLoading(true);
            try {
                setLoading(true);
                let endpoint;
                if (category === 'KeepTradeCut') {
                    endpoint = 'webscrap/ktc';
                }

                if (endpoint) {
                    const response = await axios.get(`http://localhost:5000/api/${endpoint}`);
                    setData(response.data);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
                console.log(data);
            }
        };

        fetchData();
    }, [category]);

    const handleTeam1InputChange = (e) => {
        const value = e.target.value;
        setTeam1SearchTerm(value);

        if (value) {
            const filtered = data.filter((player) =>
                player.name.toLowerCase().includes(value.toLowerCase())
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
                player.name.toLowerCase().includes(value.toLowerCase())
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
        setTeamOneData((allItems) => [...allItems, item]);
        setTeam1SearchTerm('')
        setTeam1FilteredData([])


        isSuperflex ? setTeamOnePlayerValue(prev => prev + item.superflexValue)
        : setTeamOnePlayerValue(prev => prev + item.value);
    }



    const addToTeamTwo = (item) => {
        setTeamTwoData((allItems) => [...allItems, item]);
        setTeam2SearchTerm('')
        setTeam2FilteredData([])
        isSuperflex ? setTeamTwoPlayerValue(prev => prev + item.superflexValue)
        : setTeamTwoPlayerValue(prev => prev + item.value);
    }

    useEffect(() => {
        updateIndicator();
    }, [teamOnePlayerValue])

    useEffect(() => {
        updateIndicator();
    }, [teamTwoPlayerValue])


    useEffect(() => {
        setTeamOneData([]);
        setTeamTwoData([]);
        setTeamOnePlayerValue(0);
        setTeamTwoPlayerValue(0);
    }, [isSuperflex])

    const [indicator, setIndicator] = useState('');

    const updateIndicator = () => {
        if (teamOnePlayerValue - teamTwoPlayerValue < 101 && teamOnePlayerValue - teamTwoPlayerValue > -1) {
            setIndicator('green');
        } else if (teamOnePlayerValue - teamTwoPlayerValue > -101 && teamOnePlayerValue - teamTwoPlayerValue < 1) {
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




    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar />
            <div className={`${style.tradeMain} container-fluid p-0`}>
                <h2 className="mb-4">{category} CALCULATOR</h2>
                <h3>Superflex <span><label class={`${style.switch}`}>
                    <input type="checkbox" onClick={() => setIsSupeflex(!isSuperflex)} />
                    <span class={`${style.slider} ${style.round}`}></span>
                </label></span></h3>
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
                                    teamOneData.map((value, index) => {
                                        return <p key={index} className='text-center'>{value.name} - {isSuperflex ? value.superflexValue : value.value}</p>
                                    })
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
                                    teamTwoData.map((value, index) => {
                                        return <p key={index} className='text-center'>{value.name} - {isSuperflex ? value.superflexValue : value.value}</p>
                                    })
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
                    teamOnePlayerValue - teamTwoPlayerValue < 101 && teamOnePlayerValue - teamTwoPlayerValue > -101
                        ?
                        <h3 className='text-center text-success'>Fair Trade. Point Difference: {teamOnePlayerValue - teamTwoPlayerValue}</h3>
                        :
                        null

                }

                {
                    teamOnePlayerValue - teamTwoPlayerValue > 100
                        ?
                        <h3 className='text-center text-danger'>Unfair Trade. Point missing from team 2: {teamOnePlayerValue - teamTwoPlayerValue}</h3>
                        :
                        null

                }

                {
                    teamOnePlayerValue - teamTwoPlayerValue < -100
                        ?
                        <h3 className='text-center text-danger'>Unfair Trade. Point missing from team 1: {(teamOnePlayerValue - teamTwoPlayerValue) * -1}</h3>
                        :
                        null

                }


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
