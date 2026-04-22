import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/profile/Profile";

import Login from "./Components/LoginSignUp/Login";

import SignUp from "./Components/LoginSignUp/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
