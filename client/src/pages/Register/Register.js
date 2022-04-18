import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import SignupForm from "../../components/SignUpForm/SignupForm";
import API from "../../utils/API";

function Register(props) {
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

  const loginAfterSignup = (data) => {
    console.log(data)
    props.loginHandleFormSubmit(data)
  }

  let navigate = useNavigate();

  const handleSubmitButton = (event) => {
    event.preventDefault();
    if (registerData.username && registerData.email && registerData.password) {
      API.newUser(registerData)
        .then(() => {
          setRegisterData({
            username: "",
            email: "",
            password: "",
          })
          loginAfterSignup(registerData);
          navigate("/");
        })
        .catch((err) => {
          // alert("Registration failed. Email already in use.");
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
          newUserUsername={registerData.username}
          newUserEmail={registerData.email}
          newUserPassword={registerData.password}
        />
      </Container>
    </div>
  );
}

export default Register;
