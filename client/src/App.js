import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import API from "./utils/API"

function App() {

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    API.getCurrentUser().then((res) => {
      setCurrentUser(res.data.user);
    });
  }, []);

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    API.userLogin(loginFormData)
      .then((res) => {
        setLoginFormData({
          email: "",
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

  const userLogout = () => {
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
          logout={userLogout}
        />
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
