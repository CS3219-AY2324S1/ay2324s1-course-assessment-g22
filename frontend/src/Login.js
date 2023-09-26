import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (x) => {
    x.preventDefault();

    let loginData = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:4000/api/login", loginData)
      .then((response) => {
        console.log("Login successful:", response.data);
        signIn({
          token: response.data.token,
          expiresIn: 60 * 60 * 24 * 3,
          tokenType: "Bearer",
          authState: {
            username: response.data.username,
            role: response.data.role,
            exp: response.data.exp,
          },
        });
        // Delay needed for token to be set in cookie
        setTimeout(() => {
          navigate("/");
          onLogin(username);
        }, 20);
      })
      .catch((error) => {
        console.error("Login failed:", error.response);
        alert("Incorrect Username or Password");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
