import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import SignupForm from "../../components/SignUpForm/SignupForm";
import API from "../../utils/API";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  let navigate = useNavigate();

  const handleSubmitButton = (event) => {
    event.preventDefault();
    if (registerData.email && registerData.password) {
      API.newUser(registerData)
        .then(() => {
          setRegisterData({
            username: "",
            email: "",
            password: "",
          });
          alert(
            "Thank you for registering! Please login at the top of the page."
          );
          navigate.push("/");
        })
        .catch((err) => {
          alert("Registration failed. Email already in use.");
          setRegisterData({
            username: "",
            email: "",
            password: "",
          });
        });
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <div>
      <Container>
        <h1>Registration</h1>
        <SignupForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmitButton}
          newUserEmail={registerData.email}
          newUserPassword={registerData.password}
        />
      </Container>
    </div>
  );
}

export default Register;
