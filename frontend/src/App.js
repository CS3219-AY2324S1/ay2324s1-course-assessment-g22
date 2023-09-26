import "./App.css";
import QuestionBank from "./questions/QuestionBank";
import QuestionDescription from "./questions/QuestionDescription";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Profile from "./Profile";
import { useSignOut, RequireAuth, useIsAuthenticated } from "react-auth-kit";

function App() {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = (username) => {
    // Placeholder for post login actions
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <Router>
      <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-4xl font-extrabold tracking-tight">PeerPrep</h1>
          {isAuthenticated() ? (
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
                to="/login"
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
            <RequireAuth loginPath="/login">
              <QuestionBank />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/question/:title"
          element={
            <RequireAuth loginPath="/login">
              <QuestionDescription />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <RequireAuth loginPath="/login">
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
