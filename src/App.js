import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

import Home from "./screens/Home";
import Ranking from "./screens/Ranking";
import TradeCalculator from "./screens/TradeCalculator";
import AdminLogin from "./screens/AdminLogin";
import Admin from "./screens/Admin";
import AdminAddBlog from "./screens/AdminAddBlog";
import AdminAddYoutubePost from "./screens/AdminAddYoutubePost";
import OurTeam from "./screens/OurTeam";
import Blog from "./screens/Blog";
import TradeDatabase from "./screens/TradeDatabase";
import StartAndSit from "./screens/StartAndSit";
import Projection from "./screens/Projection";
import PastProduction from "./screens/PastProduction";
import BettingData from "./screens/BettingData";
import LeagueImport from "./screens/LeagueImport";
import MyLeague from "./screens/MyLeague";

import { initializeGA } from "./analytics";

// Component to track page views
const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    console.log("Page view tracked:", location.pathname); // Debugging
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initializeGA(); // Initialize Google Analytics when the app loads
  }, []);

  return (
    <BrowserRouter>
      <TrackPageView /> {/* This tracks page views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking/:category" element={<Ranking />} />
        <Route path="/trade/:category" element={<TradeCalculator />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminaddblog" element={<AdminAddBlog />} />
        <Route path="/adminaddyoutubepost" element={<AdminAddYoutubePost />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/start&sit" element={<StartAndSit />} />
        <Route path="/tradedatabase" element={<TradeDatabase />} />
        <Route path="/projection" element={<Projection />} />
        <Route path="/pastproduction" element={<PastProduction />} />
        <Route path="/bettingdata" element={<BettingData />} />
        <Route path="/leagueimport" element={<LeagueImport />} />
        <Route path="/myleague" element={<MyLeague />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
