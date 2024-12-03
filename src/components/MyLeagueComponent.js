import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from '../style/MyLeague.module.css';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

function MyLeagueComponent() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [leagueData, setLeagueData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);

  const leagues = JSON.parse(localStorage.getItem('leagues')) || [];
  const firstLeague = leagues[leagues.length - 1];

  const location = useLocation();
  const navigate = useNavigate();

  const [whichLeague, setWhichLeague] = useState(
    location.state?.leagueId || (firstLeague ? firstLeague.leagueId : null)
  );

  useEffect(() => {
    if (!leagues || leagues.length === 0) {
      setIsModalOpen(true);
    }
  }, []);

  const removeLeagueFromLocalStorage = (leagueIdToRemove) => {
    const leagues = JSON.parse(localStorage.getItem('leagues')) || [];
    const updatedLeagues = leagues.filter(league => league.leagueId !== leagueIdToRemove);
    localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
    alert('Wrong League ID, League Has Been Removed. Import Your League Again');
  };

  useEffect(() => {
    if (!whichLeague) {
      setError('No league selected. Please import a league.');
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const leagueResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}`);
        const teamResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}/rosters`);
        const draftResponse = await Axios.get(`https://api.sleeper.app/v1/league/${whichLeague}/drafts`);
        const nameFromId = await Axios.get('http://46.202.178.195:5000/api/sleeperPlayers');

        setPlayers(nameFromId.data);
        setLeagueData(leagueResponse.data);
        setTeamData(teamResponse.data);
        setDraft(draftResponse.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        removeLeagueFromLocalStorage(whichLeague);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [whichLeague]);

//   if (loading) {
//     return <Loader />;
//   }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  const getPlayerNameById = (playerId) => {
    const player = players.find(p => p.playerId === playerId);
    return player ? player.name : playerId;
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>


      {/* Button to Open Modal */}
      <button style={{background:'green', color:'white', border:'none'}} onClick={openModal} className="btn btn-primary mb-3">YOUR LEAGUES</button>

      {/* Modal */}
      {isModalOpen && (
        <div className={`modal fade show ${style.modal}`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ backgroundColor: 'black', color: 'green' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid green' }}>
                <h5 className="modal-title" style={{ color: 'green' }}>Select a League</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true" style={{color:'white'}}>&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ overflowY: 'auto', maxHeight: '500px', backgroundColor: 'black' }}>
                {leagues.length === 0 ? (
                  <div style={{ color: 'white' }}>
                    <p>No leagues found. Please import a league.</p>
                    <button onClick={() => navigate('/leagueimport')} className="btn btn-warning">Go to League Import</button>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: 'white' }}>Select a League to View</p>
                    {leagues.map((league) => (
                      <div key={league.leagueId} className={`${style.leagueItem} mb-2`}>
                        <button
                          onClick={() => {
                            setWhichLeague(league.leagueId);
                            // Don't close the modal automatically when league is changed
                          }}
                          className="btn btn-outline-primary w-100"
                          style={{ color: 'green', borderColor: 'green' }}
                        >
                          {league.leagueName}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ color: 'white' }}>
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

                  {teamData ? teamData.map((team) => (
                    <div key={team.roster_id} className={`${style.teamCont}`}>
                      <h5 style={{ color: 'green' }}>Team ID: {team.roster_id}</h5>
                      <p>Wins: {team.settings.wins} | Losses: {team.settings.losses}</p>

                      <h4 style={{ color: 'green' }}>Starters</h4>
                      <div className='row p-0'>
                        {team.starters.map((starter, index) =>
                          starter === "0" ? (
                            <div key={index} className="col-auto"><p>○ Empty Slot</p></div>
                          ) : (
                            <div key={index} className="col-auto"><p>○ {getPlayerNameById(starter)}</p></div>
                          )
                        )}
                      </div>

                      <h4 style={{ color: 'green' }}>Bench</h4>
                      <div className="row">
                        {team.players
                          ? team.players
                            .filter((benchPlayer) => !team.starters.includes(benchPlayer))
                            .map((benchPlayer, index) => (
                              <div key={index} className="col-auto">
                                <p>○ {getPlayerNameById(benchPlayer)}</p>
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
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default MyLeagueComponent;
