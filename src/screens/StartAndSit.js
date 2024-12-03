import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from '../style/StartAndSit.module.css';
import axios from 'axios';
import Loader from '../components/Loader';
import MyLeagueComponent from '../components/MyLeagueComponent';

function StartAndSit() {
    const [loader, setLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [rushingYard, setRushingYard] = useState([]);
    const [passingYard, setPassingYard] = useState([]);
    const [pointsPerGame, setPointsPerGame] = useState([]);
    const [fantasyPros, setFantasyPros] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]); // State for selected players
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoader(true);
        axios.get('http://46.202.178.195:5000/api/webscrap/start&sit')
            .then((response) => {
                setPassingYard(response.data['passingYards']);
                setRushingYard(response.data['rushingYards']);
                setPointsPerGame(response.data['pointsPerGame']);
                setPlayerData(response.data['players']);
                setFantasyPros(response.data['fantasyPros'])
                setLoader(false);
            }).catch((error) => {
                console.log(error);
                setError(true);
            })
    }, []);

    // Filter players based on the search query
    const filteredPlayers = playerData.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle adding a player
    const addPlayer = (player) => {
        if (!selectedPlayers.some(p => p.name === player.name)) { // Prevent adding the same player multiple times
            setSelectedPlayers([...selectedPlayers, player]); // Add the player to the selected players list
        }
    };

    // Function to handle removing a player
    const removePlayer = (playerName) => {
        setSelectedPlayers(selectedPlayers.filter(player => player.name !== playerName)); // Remove the player from the list
    };

    return (
        <>
            {
                error ? <h1 style={{color:'red'}}>ERROR OCCURED</h1> : <>
                {loader ? <Loader/> : null}
                    <Navbar />
                    <div className={`${style.startAndSitMain} container-fluid`}>
                        <h2 className='mt-3 mb-4'>Start & Sit Tool</h2>
                        <MyLeagueComponent /> <br />
                        <div className="row my-5" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="col-md-4 my-3">
                                <div className={style.playerCard}>
                                    <input
                                        className='mb-3'
                                        type="text"
                                        placeholder='Search For Players'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {filteredPlayers.length > 0 ? (
                                        <div className={style.playerList}>
                                            {filteredPlayers.map((player, index) => (
                                                <p
                                                    key={index}
                                                    className={style.playerName}
                                                    onClick={() => addPlayer(player)} // Pass the clicked player to addPlayer
                                                >
                                                    {player.name + ' - ' + player.team + ' - ' + player.position}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='text-center'>No players found.</p>
                                    )}
                                </div>
                            </div>
        
                            {/* Render selected players' details in separate columns */}
                            {selectedPlayers.map((player, index) => (
                                <div key={index} className="col-md-4 my-3">
                                    <div className={style.playerCard}>
                                        <h3 style={{color:'green'}}>Player Info</h3>
                                        <hr style={{backgroundColor:'white'}} />
                                        <p><strong style={{color:'green'}}>Name:</strong> {player.name}</p>
                                        <p><strong style={{color:'green'}}>Team:</strong> {player.team_full_name}</p>
                                        {/* Check if the team exists in fantasyPros before accessing rank */}
                                        <p><strong style={{color:'green'}}>Team Rank:</strong> {
                                            fantasyPros.length > 0
                                                ? (fantasyPros.find(fantasyPlayer => fantasyPlayer.team === player.team_full_name)?.column1 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
                                        <p><strong style={{color:'green'}}>Average Team Rushing Yards:</strong> {
                                            rushingYard.length > 0
                                                ? (rushingYard.find(fantasyPlayer => fantasyPlayer.team === player.findOnTeamRankingWebsite)?.stat1 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
        
                                        <p><strong style={{color:'green'}}>Last Three Weeks Rushing Yards:</strong> {
                                            rushingYard.length > 0
                                                ? (rushingYard.find(fantasyPlayer => fantasyPlayer.team === player.findOnTeamRankingWebsite)?.stat2 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
        
                                        <p><strong style={{color:'green'}}>Last Three Weeks Passing Yards:</strong> {
                                            passingYard.length > 0
                                                ? (passingYard.find(fantasyPlayer => fantasyPlayer.team === player.findOnTeamRankingWebsite)?.stat2 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
        
                                        <p><strong style={{color:'green'}}>Average Points Allowed Per Game:</strong> {
                                            pointsPerGame.length > 0
                                                ? (pointsPerGame.find(fantasyPlayer => fantasyPlayer.team === player.findOnTeamRankingWebsite)?.stat1 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
        
                                        <p><strong style={{color:'green'}}>Average Points Allowed Past Three Weeks:</strong> {
                                            pointsPerGame.length > 0
                                                ? (pointsPerGame.find(fantasyPlayer => fantasyPlayer.team === player.findOnTeamRankingWebsite)?.stat2 || "Rank not available")
                                                : "Data not loaded"
                                        }</p>
        
                                        <p><strong style={{color:'green'}}>Fantasy Points Allowed:</strong> {
                                            fantasyPros.length > 0
                                                ? (
                                                    // Find the team in fantasyPros and assign it to fantasyPlayer
                                                    (function () {
                                                        const fantasyPlayer = fantasyPros.find(fantasyPlayer => fantasyPlayer.team === player.team_full_name);
                                                        if (fantasyPlayer) {
                                                            // Check player position and select the corresponding column
                                                            switch (player.position) {
                                                                case 'QB':
                                                                    return fantasyPlayer.column2;
                                                                case 'RB':
                                                                    return fantasyPlayer.column4;
                                                                case 'WR':
                                                                    return fantasyPlayer.column6;
                                                                case 'TE':
                                                                    return fantasyPlayer.column8;
                                                                case 'K':
                                                                    return fantasyPlayer.column10;
                                                                default:
                                                                    return "Fantasy Points Not Found";
                                                            }
                                                        } else {
                                                            return "Team not found";
                                                        }
                                                    })()
                                                )
                                                : "Data not loaded"
                                        }</p>
        
                                        <button className={style.removePlayer} onClick={() => removePlayer(player.name)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    );
}

export default StartAndSit;
