import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import API from "./utils/API";

function App() {
  // controls state for login data
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // holds current user information in state
  const [currentUser, setCurrentUser] = useState();

  // gets current session data and sets to state
  useEffect(() => {
    API.getCurrentUser().then((res) => {
      setCurrentUser(res.data.user);
    });
  }, []);

  // handler for login form
  // sets values of inputs to state as loginFormData
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  // submit handler for login button
  // clears out inputs in state
  // sets current user information to state as currentUser
  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginFormData)
    API.userLogin(loginFormData)
      .then((res) => {
        setLoginFormData({
          username: "",
          password: "",
        });
        API.getCurrentUser().then((res) => {
          setCurrentUser(res.data.user);
        });
        window.location.reload(false);
      })
      .catch((err) => {
        alert("login failed");
      });
  };

  // click handler for "logout" button
  const handleUserLogout = () => {
    API.userLogout().then((res) => {
      setCurrentUser();
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          currentUser={currentUser}
          loginFormData={loginFormData}
          inputChange={handleLoginInputChange}
          loginSubmit={handleLoginFormSubmit}
          logout={handleUserLogout}
        />
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Register handleLogin={handleLoginFormSubmit}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
