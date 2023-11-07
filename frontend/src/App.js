import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  useSignIn,
  useSignOut,
  RequireAuth,
  useIsAuthenticated,
} from "react-auth-kit";
import io from "socket.io-client";
import QuestionBank from "./questions/QuestionBank";
import QuestionDescription from "./questions/QuestionDescription";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Profile from "./Profile";

import { USERS_BASE_URL } from "./Constants";
import { MATCHING_URL } from "./Constants";
import { TOKEN_EXPIRE_TIME } from "./Constants";
import { TOKEN_REFRESH_TIME } from "./Constants";
import { UserProvider } from "./Context/UserContext";
import CollaborationPage from "./Pages/CollaborationPage";
import HistoryPage from "./Pages/HistoryPage";
import HomePage from "./Pages/HomePage";

function App() {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const socket = io(MATCHING_URL, { autoConnect: false });
  socket.connect();

  const handleLogin = (username) => {
    // Placeholder for post login actions
  };

  const handleLogout = () => {
    signOut();
    window.location.reload();
  };

  useEffect(() => {
    const refreshToken = () => {
      if (isRefreshing || Cookies.get("_auth") === undefined) {
        return;
      }
      setIsRefreshing(true);
      axios
        .get(`${USERS_BASE_URL}/api/refresh`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        })
        .then((response) => {
          signIn({
            token: response.data.token,
            expiresIn: TOKEN_EXPIRE_TIME,
            tokenType: "Bearer",
            authState: {
              username: response.data.username,
              role: response.data.role,
              exp: response.data.exp,
            },
          });

          var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Singapore",
          };

          var formattedExp = new Date(response.data.exp).toLocaleString(
            "en-US",
            options
          );

          console.log("Token expiry time (GMT +8):", formattedExp);

          setTimeout(refreshToken, TOKEN_REFRESH_TIME);
        })
        .catch((error) => {
          console.error("Token refresh failed:", error);

          setTimeout(refreshToken, TOKEN_REFRESH_TIME);
        });
    };
    if (isAuthenticated()) {
      // First refresh is given earlier
      setTimeout(refreshToken, 10000);
    }
  });

  return (
    <Router>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">PeerPrep</h1>
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
              <UserProvider>
                <HomePage socket={socket} />
              </UserProvider>
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
        <Route
          path="/question/"
          element={
            <RequireAuth loginPath="/login">
              <QuestionBank />
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
        <Route
          path="/collab/:roomid"
          element={
            <RequireAuth loginPath="/login">
              <CollaborationPage matchsocket={socket} />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth loginPath="/login">
              <HistoryPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
