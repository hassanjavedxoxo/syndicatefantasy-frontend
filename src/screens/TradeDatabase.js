import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from '../style/TradeDatabase.module.css';
import axios from 'axios';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

function TradeDatabase() {
    const [loader, setLoader] = useState(false); // State to manage the loader's visibility
    const [playersData, setPlayersData] = useState([]); // State to store the list of players fetched from the API
    const [filterDataInp1, setFilterDataInp1] = useState(''); // State for filtering players in the first input
    const [filterDataInp2, setFilterDataInp2] = useState(''); // State for filtering players in the second input
    const [input1Players, setInput1Players] = useState([]); // State to store selected players for the first input
    const [input2Players, setInput2Players] = useState([]); // State to store selected players for the second input
    const [filteredPlayers1, setFilteredPlayers1] = useState([]); // State to store filtered players for the first input
    const [filteredPlayers2, setFilteredPlayers2] = useState([]); // State to store filtered players for the second input

    const [searchData, setSearchData] = useState([]);

    // Fetch the players data when the component mounts
    useEffect(() => {
        setLoader(true); // Show loader while fetching data
        axios.get('http://localhost:5000/api/dynasty-ranking/all')
            .then((res) => {
                setPlayersData(res.data); // Store the fetched player data
            }).catch((err) => {
                console.log(err); // Log any errors during the fetch
            }).finally(() => {
                setLoader(false); // Hide loader after the fetch is complete
            });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Handle changes in the first search input (filtering players)
    const handleInputChange1 = (e) => {
        const value = e.target.value; // Get the input value
        setFilterDataInp1(value); // Update the state with the new input value
        if (value) {
            // Filter players based on the input value and exclude those already selected in input2Players
            setFilteredPlayers1(playersData.filter(player => 
                player.name.toLowerCase().includes(value.toLowerCase()) &&
                !input2Players.some(selectedPlayer => selectedPlayer.id === player.id)
            ));
        } else {
            // If no input, clear the filtered players
            setFilteredPlayers1([]);
        }
    };

    // Handle changes in the second search input (filtering players)
    const handleInputChange2 = (e) => {
        const value = e.target.value; // Get the input value
        setFilterDataInp2(value); // Update the state with the new input value
        if (value) {
            // Filter players based on the input value and exclude those already selected in input1Players
            setFilteredPlayers2(playersData.filter(player => 
                player.name.toLowerCase().includes(value.toLowerCase()) &&
                !input1Players.some(selectedPlayer => selectedPlayer.id === player.id)
            ));
        } else {
            // If no input, clear the filtered players
            setFilteredPlayers2([]);
        }
    };

    // Handle the player click event to add selected players to the state
    const handlePlayerClick = (player, inputNumber) => {
        if (inputNumber === 1) {
            // If the player is selected from the first input, add to input1Players
            setInput1Players(prevState => [...prevState, { name: player.name, id: player.id }]);
            setFilterDataInp1(''); // Clear the input field
            setFilteredPlayers1([]); // Clear the filtered player list
        } else {
            // If the player is selected from the second input, add to input2Players
            setInput2Players(prevState => [...prevState, { name: player.name, id: player.id }]);
            setFilterDataInp2(''); // Clear the input field
            setFilteredPlayers2([]); // Clear the filtered player list
        }
    };

    const handleSearch = () => {
        setLoader(true);
        let side1 = [];
        let side2 = [];

        // Check if input1Players or input2Players are empty
        if (input1Players.length === 0) {
            alert('Fill the required field for Side 1');
        } else if (input2Players.length === 0) {
            // Store the player IDs from input1Players into side1
            side1 = input1Players.map(player => player.id); // Assuming `id` is the player ID field

            // Send the POST request with the player IDs for side1 and side2
            axios.post('http://localhost:5000/api/database/get', {
                side1: side1,
                category: isDynasty ? 'dynasty' : 'redraft'
            })
                .then(response => {
                    console.log('API Response:', response.data);
                    setSearchData(response.data);
                    // Handle the response as needed
                })
                .catch(error => {
                    console.error('API Error:', error);
                    // Handle the error as needed
                }).finally(() => {
                    setLoader(false)
                });
        } else {
            // Store the player IDs from input1Players into side1
            side1 = input1Players.map(player => player.id);
            // Store the player IDs from input2Players into side2
            side2 = input2Players.map(player => player.id);

            axios.post('http://localhost:5000/api/database/get', {
                side1: side1,
                side2: side2,
                category: isDynasty ? 'dynasty' : 'redraft'
            })
                .then(response => {
                    console.log('API Response:', response.data);
                    setSearchData(response.data);
                })
                .catch(error => {
                    console.error('API Error:', error);
                    // Handle the error as needed
                }).finally(() => {
                    setLoader(false);
                });
        }
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        return `${month}/${day}`;
    };

    const [isDynasty, setIsDynasty] = useState(true);
    const changeCategory = (category) => {
        if(category === 'dynasty') {
            setIsDynasty(true);
        } else if(category === 'redraft') {
            setIsDynasty(false);
        }
    }
    return (
        <>
            {loader ? <Loader /> : null} {/* Show loader when data is being fetched */}
            <Navbar />
            <div className={`${style.tradeDatabaseMain} container-fluid`}>
                <div className={`${style.buttonDiv}`}>
                    <button className={isDynasty ? style.dynastyClicked : style.dynasty} onClick={() => changeCategory('dynasty')}>Dynasty</button>
                    <button className={isDynasty ? style.redraft : style.redraftClicked} onClick={() => changeCategory('redraft')}>Redraft</button>
                </div>
                <div className="row mt-5">
                    <div className="col-md-5">
                        <input
                            value={filterDataInp1}
                            onChange={handleInputChange1}
                            placeholder='Search For Players'
                            type="text"
                            className={style.dbInput}
                        />
                        <div className="row px-0" style={{ paddingTop: '20px' }}>
                            {input1Players.map((value) => (
                                <div className="col-auto my-2">
                                    <button className={style.selectedPlayer}>{value.name}</button>
                                </div>
                            ))}
                        </div>
                        <div className={style.showPlayers}>
                            {filteredPlayers1.map((player) => (
                                <button key={player.id} onClick={() => handlePlayerClick(player, 1)}>
                                    {player.name} {/* Show player name as button */}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <input
                            value={filterDataInp2}
                            onChange={handleInputChange2}
                            type="text"
                            className={style.dbInput}
                            placeholder='Search For Players (Optional)'
                        />
                        <div className="row px-0" style={{ paddingTop: '20px' }}>
                            {input2Players.map((value) => (
                                <div className="col-auto my-2">
                                    <button className={style.selectedPlayer}>{value.name}</button>
                                </div>
                            ))}
                        </div>
                        <div className={style.showPlayers}>
                            {filteredPlayers2.map((player) => (
                                <button key={player.id} onClick={() => handlePlayerClick(player, 2)}>
                                    {player.name} {/* Show player name as button */}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button onClick={() => handleSearch()} className={style.dbSearch}>Search</button> {/* Search button */}
                    </div>
                </div>

                <div className={`${style.dbResult} container-fluid p-0 my-5`}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>SIDE 1</th>
                                <th>SIDE 2</th>
                                <th>SETTINGS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchData.length > 0 ? (
                                searchData.map((value) => (
                                    <tr key={value.date}>
                                        <td>{formatDate(value.date)}</td>
                                        <td><br />
                                            {value.side1.map((val) => (
                                                <>{val.name}<br /><br /></>
                                            ))}
                                        </td>
                                        <td><br />
                                            {value.side2.map((val) => (
                                                <>{val.name}<br /><br /></>
                                            ))}
                                        </td>
                                        <td>
    {value.qb} QB ~ {value.tm} TM ~ {value.ppr} PPR ~ {value.tep} TEP ~ Start {value.start}
</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>SEARCH TO GET THE DATA</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TradeDatabase;
