import "./App.css";
import QuestionBank from "./questions/QuestionBank";
import QuestionDescription from "./questions/QuestionDescription";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Profile from "./Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-4xl font-extrabold tracking-tight">PeerPrep</h1>
          {isLoggedIn && (
            <Link to="/profile" className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white">
              Profile
            </Link>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <QuestionBank /> : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/question/:title" element={<QuestionDescription />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
