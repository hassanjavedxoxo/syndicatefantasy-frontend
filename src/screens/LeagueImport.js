import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../style/LeagueImport.module.css';

function LeagueImport() {
  return (
    <>
        <Navbar/>
            <div className={`${style.leagueImportMain} container-fluid`}>
                <h5 className='text-center mt-4'>Welcome to</h5>
                <h5 className='text-center'>Syndicate Fantasy is a free fantasy football analytics and tooling site that utilizes real-time fantasy data for both redraft and dynasty leagues, aiding users in making quicker and more well-informed fantasy football decisions.</h5>
                <h5 className='text-center mt-5'>Let's get started!</h5>
                <div className={`${style.platformSelectCont} container`}>
                    <div className="row mt-5" style={{display:'flex', justifyContent:'center'}}>
                        <div className="col-auto">
                        <button className={style.platformSelect}><img src="https://dynasty-daddy.com/assets/platforms/sleeper.webp" alt="" /></button>
                        </div>
                    </div>

                    <h5 className='text-center mt-3'>Sleeper</h5>


                    <input type="text" className={style.leagueIdInput} placeholder='Enter Sleeper League ID' />
                    <button className={style.loginButton}>Login</button>
                    
                </div>
            </div>
        <Footer/>
    </>
  )
}

export default LeagueImport