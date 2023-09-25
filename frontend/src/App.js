import "./App.css";
import QuestionBank from "./questions/QuestionBank";
import QuestionDescription from "./questions/QuestionDescription";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Profile from "./Profile";
import { useSignOut } from "react-auth-kit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const signOut = useSignOut();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);

    localStorage.setItem("user", username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");

    signOut();
    localStorage.removeItem("user");
  };

  const updateUsername = (username) => {
    setUsername(username);
  };

  return (
    <Router>
      <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-4xl font-extrabold tracking-tight">PeerPrep</h1>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white"
              >
                Profile
              </Link>
              <Link
                to="/"
                className="w-full bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          ) : null}
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
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={
            <Profile username={username} updateUsername={updateUsername} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
