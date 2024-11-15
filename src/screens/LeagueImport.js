import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../style/LeagueImport.module.css';
import axios from 'axios';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function LeagueImport() {
    const [leagueId, setLeagueId] = useState('');
    const [platform, setPlatform] = useState('sleeper');
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();

    const importLeague = () => {
        // Retrieve the leagues from localStorage or initialize an empty array
        const existingLeagues = JSON.parse(localStorage.getItem('leagues')) || [];
    
        // Check if the leagueId already exists
        const leagueExists = existingLeagues.some(league => league.leagueId === leagueId);
    
        if (leagueExists) {
            alert('This league ID already exists');
            return; // Stop the process if league ID is already in the list
        }
    
        setLoader(true); // Show loader while fetching the league data
    
        axios.get(`https://api.sleeper.app/v1/league/${leagueId}`)
            .then((response) => {
                // Create a new league object
                const newLeague = { 
                    platform, 
                    leagueId, 
                    leagueName: response.data.name 
                };
    
                // Add the new league to the existing leagues array
                existingLeagues.push(newLeague);
    
                // Save the updated leagues array back to localStorage
                localStorage.setItem('leagues', JSON.stringify(existingLeagues));
    
                setLoader(false); // Hide the loader
                navigate('/myleague', {
                    state: {
                        leagueId: leagueId
                    }
                });
            }).catch((err) => {
                setLoader(false); // Hide the loader on error
                alert('WRONG LEAGUE ID');
                console.log(err);
            });
    };
    
    if(loader) {
        return <Loader/>
    } else {
        return (
            <>
                <Navbar />
                <div className={`${style.leagueImportMain} container-fluid`}>
                    <h5 className='text-center mt-4'>Welcome to</h5>
                    <h5 className='text-center'>Syndicate Fantasy is a free fantasy football analytics and tooling site that utilizes real-time fantasy data for both redraft and dynasty leagues, aiding users in making quicker and more well-informed fantasy football decisions.</h5>
                    <h5 className='text-center mt-5'>Let's get started!</h5>
                    <div className={`${style.platformSelectCont} container`}>
                        <div className="row mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="col-auto">
                                <button className={style.platformSelect}><img src="https://dynasty-daddy.com/assets/platforms/sleeper.webp" alt="" /></button>
                            </div>
                        </div>
    
                        <h5 className='text-center mt-3'>Sleeper</h5>
    
    
                        <input onChange={(e) => setLeagueId(e.target.value)} type="text" className={style.leagueIdInput} placeholder='Enter Sleeper League ID' />
                        <button className={style.loginButton} onClick={() => importLeague()}>Login</button>
    
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    }

    

export default LeagueImport