import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from '../style/MyLeague.module.css';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

function MyLeague() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [leagueData, setLeagueData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const [players, setPlayers] = useState([]); // State to store player data

  const leagues = JSON.parse(localStorage.getItem('leagues')) || [];
  const firstLeague = leagues[leagues.length - 1];

  const location = useLocation();
  const navigate = useNavigate();

  // Set whichLeague based on location.state or fallback to firstLeague.leagueId
  const [whichLeague, setWhichLeague] = useState(
    location.state?.leagueId || (firstLeague ? firstLeague.leagueId : null)
  );

  // If no leagues are in localStorage, redirect to league import
  useEffect(() => {
    const leagues = JSON.parse(localStorage.getItem('leagues'));
    
    if (!leagues || leagues.length === 0) {
      navigate('/leagueimport');
    }
  }, [navigate]);



  const removeLeagueFromLocalStorage = (leagueIdToRemove) => {
    // Get the current array of leagues from localStorage
    const leagues = JSON.parse(localStorage.getItem('leagues')) || [];
  
    // Filter out the league with the specified leagueId
    const updatedLeagues = leagues.filter(league => league.leagueId !== leagueIdToRemove);
  
    // Save the updated array back to localStorage
    localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
    alert('Wrong League ID, League Has Been Removed. Import Your League Again')
  };

  // Fetch data for the selected league
  useEffect(() => {
    if (!whichLeague) {
      setError('No league selected. Please import a league.');
      return; // Exit early if no league ID is found
    }

    setLoading(true);
    setError(null); // Reset error state before fetching new data

    const fetchData = async () => {
      try {
        const leagueResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}`);
        const teamResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}/rosters`);
        const draftResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}/drafts`);
        const nameFromId = await Axios.get('http://46.202.178.195:5000/api/sleeperPlayers');

        console.log(leagueData, teamResponse, draftResponse);


        // Store player data in state
        setPlayers(nameFromId.data);

        setLeagueData(leagueResponse.data);
        setTeamData(teamResponse.data);
        setDraft(draftResponse.data[0]); // Access the first draft
      } catch (error) {
        console.error("Error fetching data:", error);
        removeLeagueFromLocalStorage(whichLeague);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [whichLeague]);

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  // If there's an error, show error message
  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  // Function to get the player's name by ID
  const getPlayerNameById = (playerId) => {
    const player = players.find(p => p.playerId === playerId);
    return player ? player.name : playerId;
  };

  return (
    <>
      <Navbar />

      <div className={`${style.myLeagueMain} container-fluid p-0 mb-5`}>
        {/* MAIN PAGE CONTENT */}
        {leagueData ? (
          <>
            <h4 style={{ color: 'green' }}>League Overview</h4>
            <h4 style={{ color: 'green' }}>League Name: {leagueData.name}</h4>
            <p className="mt-4 mb-0 pb-1">Season: {leagueData.season}</p>
            <p className="mt-0 pt-0 mb-0 pb-1">Number of Teams: {leagueData.settings.num_teams}</p>
          </>
        ) : (
          <p>Loading league information...</p>
        )}

        <h4 style={{ color: 'green' }} className="mt-5 mb-4">Team/Roster</h4>

        {Array.isArray(teamData) ?  teamData.map((team) => (
          <div key={team.roster_id} className={`${style.teamCont}`}>
            <h5 style={{ color: 'green' }}>Team ID: {team.roster_id}</h5>
            <p>Wins: {team.settings.wins} | Losses: {team.settings.losses}</p>

            <h4 style={{ color: 'green' }}>Starters</h4>
            <div className='row p-0'>
              {team.starters.map((starter, index) =>
                starter === "0" ? (
                  <div key={index} className="col-auto"><p>○ Empty Slot</p></div>
                ) : (
                  <div key={index} className="col-auto"><p>○ {getPlayerNameById(starter)}</p></div> // Display player name
                )
              )}
            </div>

            <h4 style={{ color: 'green' }}>Bench</h4>
            <div className="row">
              {team.players
                ? team.players
                  .filter((benchPlayer) => !team.starters.includes(benchPlayer)) // Filter out starters from players
                  .map((benchPlayer, index) => (
                    <div key={index} className="col-auto">
                      <p>○ {getPlayerNameById(benchPlayer)}</p> {/* Display player name */}
                    </div>
                  ))
                : <div className="col-auto"><p>○ No Bench Players</p></div>}
            </div>
          </div>
        )) : <p>Loading team data...</p>}

        <h4 style={{ color: 'green' }} className="mt-5">Draft</h4>
        {draft ? (
          <>
            <p>Draft Type: {draft.type}</p>
            <p>Pick Timer: {draft.settings.pick_timer} seconds</p>
            <p>Rounds: {draft.settings.rounds}</p>
          </>
        ) : (
          <p>Loading draft data...</p>
        )}
      </div>

      {/* SIDE BAR */}
      <div className={`${style.sideBar} ${sideBarOpen ? style.sideBarOpen : null}`}>
        <div className="row mt-2 p-0" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <div className="col-10 p-0">
            <h5 className='ml-3'>Leagues</h5>
          </div>
          <div className="col-2 p-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i onClick={() => navigate('/leagueimport')} style={{ color: 'white' }} className="fa-solid fa-circle-plus"></i>
          </div>
        </div>
        {
          JSON.parse(localStorage.getItem('leagues'))?.map((value, key) => {
            return (
              <div key={key} onClick={() => setWhichLeague(value.leagueId)} className={`${style.league} p-0`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <h5>{value.leagueName.toUpperCase()}</h5>
              </div>
            );
          })
        }

        <div className={`${style.openCloseSidebar}`} style={{
          left: sideBarOpen ? '300px' : '0',
          transition: 'left 0.3s ease-in-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} onClick={() => setSideBarOpen(!sideBarOpen)}>
          <i className="fa-solid fa-chevron-right" style={{
            transform: sideBarOpen ? 'rotate(180deg)' : '',
            transition: '0.2s ease-in-out'
          }}></i>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyLeague;
