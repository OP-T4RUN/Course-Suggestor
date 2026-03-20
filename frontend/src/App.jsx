import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import PortfolioPage from "./PortfolioPage";
import GoalSetting from "./GoalSetting";
import Pathway from "./Pathway";
import MentorChat from "./MentorChat";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/goal-setting" element={<GoalSetting />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pathway" element={<Pathway />} />
        <Route path="/mentor-chat" element={<MentorChat />} />
        <Route path="/register" element={<RegisterPage /> } />
      </Routes>
    </Router>
  );
}

export default App;