import React from 'react'
import style from '../style/Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className={`container-fluid ${style.footerMain} py-5`}>
                <div className={`container-fluid ${style.footerSub}`}>
                <div className={`row`}>
                    <div className="col-md-5">
                        <h2>About Us</h2>
                        <p className={`${style.footerAbout}`}>Welcome to the Fantasy Syndicate, your go-to for concise, no-nonsense fantasy football insights. Hosted by Josh and Alex, we're here to disrupt the status quo of mainstream media and offer real opinions from passionate football fans like you.</p>
                    </div>
                    <div className="col-md-7">
                    <h2>Site Links</h2>
                    <div className="row">
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/'}>Blog</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/bettingdata'}>League Import</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/bettingdata'}>My Leagues</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/ranking/dynasty-ranking'}>Dynasty Ranking</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/ranking/dynasty-rookie-ranking'}>Dynasty Rookie Ranking</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/ranking/redraft-ranking'}>Redraft Ranking</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/trade/keepTradeCut'}>Trade Calculator</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/tradedatabase'}>Trade Database</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/start&sit'}>Start & Sit Tool</Link>
                        </div>
                        {/* <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/pastproduction'}>Projection Points</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/projection'}>Past Productions</Link>
                        </div>
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/bettingdata'}>Betting Data</Link>
                        </div> */}
                        <div className="col-auto py-2">
                            <Link className={style.footerLinks} to={'/ourteam'}>Our Team</Link>
                        </div>

                    </div>
                    </div>
                </div>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer