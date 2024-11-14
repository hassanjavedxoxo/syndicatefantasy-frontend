import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking/:category" element={<Ranking />} />
        <Route path="/trade/:category" element={<TradeCalculator />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/adminaddblog" element={<AdminAddBlog/>} />
        <Route path="/adminaddyoutubepost" element={<AdminAddYoutubePost/>} />
        <Route path="/ourteam" element={<OurTeam/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/start&sit" element={<StartAndSit/>} />
        <Route path="/tradedatabase" element={<TradeDatabase/>} />
        <Route path="/projection" element={<Projection/>} />
        <Route path="/pastproduction" element={<PastProduction/>} />
        <Route path="/bettingdata" element={<BettingData/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
