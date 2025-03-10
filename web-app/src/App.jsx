import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import HomePage from "./home";

import Testing from "./testing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
       <Route path="/testing" element={<Testing/>} />  {/* Change this path */}
        {/* Add a home route */}
        <Route path="/" element={<Testing/>} />      </Routes>
    </Router>
  );
}

export default App;
