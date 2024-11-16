import React, { useState } from 'react'
import style from '../style/Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {

    const [navOpen, setNavOpen] = useState(false);
    const [navRankingOpen, setNavRankingOpen] = useState(false);
    const [navTradeOpen, setNavTradeOpen] = useState(false);

    const [navRankingLargeOpen, setNavRankingLargeOpen] = useState(false);
    const [navTradeLargeOpen, setNavTradeLargeOpen] = useState(false);
    return (
        <>
            <div className={`container-fluid px-0 py-3 ${style.navMain}`}>
                <div className={style.first}>
                    <Link to={'/'} style={{textDecoration:'none', color:'white'}}><p className={style.logo}>FANTASY SYNDICATE</p></Link>
                </div>
                <div className={style.second}>
                    <Link className={`${style.link}`} to={'/'}>POSTS</Link>

                    <Link className={`${style.link}`} to={'/myleague'}>MY LEAGUES</Link>
                    <div className={`${style.rankingLarge}`}>


                    <Link className={`${style.link}`} onClick={() => {setNavRankingLargeOpen(!navRankingLargeOpen); setNavTradeLargeOpen(false)}}>RANKINGS <i className="fa-solid fa-chevron-down"></i></Link>

                    {/* This will show when click on ranking */}

                    <div className={`${navRankingLargeOpen ? style.rankingContainerOpen : style.rankingContainer} container-fluid`}>
                        <Link className={style.linkLarge} to={'/ranking/dynasty-ranking'}>DYNASTY RANKING</Link><br /><br />
                        <Link className={style.linkLarge} to={'/ranking/dynasty-rookie-ranking'}>DYNASTY ROOKIE RANKING</Link><br /><br />
                        <Link className={style.linkLarge} to={'/ranking/redraft-ranking'}>REDRAFT RANKING</Link>
                    </div>
                    </div>

                    <div className={`${style.tradeLarge}`}>

                    <Link className={`${style.link}`} onClick={() => {setNavTradeLargeOpen(!navTradeLargeOpen); setNavRankingLargeOpen(false)}}>TOOLS <i className="fa-solid fa-chevron-down"></i></Link>

                    {/* This will show when click on trade */}
                    <div className={`${navTradeLargeOpen ? style.tradeContainerOpen : style.tradeContainer} container-fluid`}>
                        <Link className={style.linkLarge} to={'/trade/KeepTradeCut'}>TRADE CALCULATOR</Link><br /><br />
                        <Link className={style.linkLarge} to={'/tradedatabase'}>TRADE DATABASE</Link><br /><br />
                    <Link className={`${style.linkLarge}`} to={'/start&sit'}>START & SIT TOOL</Link><br /><br />
                    <Link className={`${style.linkLarge}`} to={'/projection'}>PROJECTION POINTS</Link><br /><br />
                    <Link className={`${style.linkLarge}`} to={'/pastproduction'}>PAST PRODUCTIONS</Link><br /><br />
                    <Link className={`${style.linkLarge}`} to={'/bettingdata'}>BETTING DATA</Link>
                    </div>
                    </div>
                    <Link className={`${style.link}`} to={'/ourteam'}>OUR TEAM</Link>

                    

                    
                </div>

                <div className={`${navOpen ? style.navSmallOpen : style.navSmall}`}>
                    <div className={`${style.navSmallSub}`}>
                        <Link onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`} to={'/'}>POSTS</Link>
                        <Link className={`${style.linkSmall}`} onClick={() => setNavRankingOpen(!navRankingOpen)}>RANKINGS</Link>
                        <Link className={`${style.linkSmall}`} onClick={() => setNavTradeOpen(!navTradeOpen)}>TOOLS</Link>
                        <Link onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`} to={'/matchup'}>MATCH UP</Link>
                        <Link onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`} to={'/ourteam'}>OUR TEAM</Link>
                        <Link onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`} to={'/myleague'}>MY LEAGUES</Link>
                    </div>
                </div>

                <div className={`${navRankingOpen ? style.navRankingSmallOpen : style.navRankingSmall}`}>
                    <i className={`fa-solid fa-chevron-left ${style.menuClose}`} onClick={() => setNavRankingOpen(!navRankingOpen)}></i>
                    <div className={`${style.navSmallSub}`}>
                        <Link to={'/ranking/dynasty-ranking'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>DYNASTY</Link>
                        <Link to={'/ranking/dynasty-rookie-ranking'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>DYNASTY ROOKIE</Link>
                        <Link to={'/ranking/redraft-ranking'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>REDRAFT</Link>
                    </div>
                </div>

                <div className={`${navTradeOpen ? style.navTradeSmallOpen : style.navTradeSmall}`}>
                    <i className={`fa-solid fa-chevron-left ${style.menuClose}`} onClick={() => setNavTradeOpen(!navTradeOpen)}></i>
                    <div className={`${style.navSmallSub}`}>
                        <Link to={'/tradecalculator/KeepTradeCut'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>TRADE CALCULATOR</Link>
                        <Link to={'/tradedatabase'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>TARDE DATABASE</Link>
                        <Link to={'/start&sit'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>START & SIT TOOL</Link>
                        <Link to={'/projection'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>PROJECTION POINTS</Link>
                        <Link to={'/pastproduction'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>PAST PRODUCTION</Link>
                        <Link to={'/bettingdata'} onClick={() => { setNavOpen(!navOpen); setNavRankingOpen(!navRankingOpen) }} className={`${style.linkSmall}`}>BETTING DATA</Link>
                    </div>
                </div>

                


            </div>
            <div className={`${style.menuSmallButton}`}>
                <i className={`fa-solid fa-minus ${navOpen ? style.menuSmallButton1Open : style.menuSmallButton1}`} onClick={() => setNavOpen(!navOpen)} style={{color:'white'}}></i>
                <i className={`fa-solid fa-minus ${navOpen ? style.menuSmallButton2Open : style.menuSmallButton2}`} onClick={() => setNavOpen(!navOpen)} style={{color:'white'}}></i>
            </div>
        </>
    )
}

export default Navbar