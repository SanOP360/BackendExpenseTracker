import React, { useRef } from "react";
import axios from "axios";
import "./loginStyles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const Navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitForm = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then((response) => {
        console.log('response is',response.data);
        
        localStorage.setItem("jwttoken", response.data.token);
        
        
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        
        Navigate("/AddExpense");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });

    // Clear input fields after form submission
    emailRef.current.value = null;
    passwordRef.current.value = null;
  };

  return (
    <div className="MainDiv">
      <form onSubmit={submitForm} className="custom-form">
        <h1 className="heading">SIGN IN</h1>

        <div className="sub-form">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="form-input"
          />
        </div>

        <div className="sub-form">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="form-input"
          />
        </div>

        <div className="formBtn">
          <button type="submit" className="custom-button">
            Login
          </button>
        </div>

        <div className="divLink">
          <Link className="link" to="/Signup">
            New User? Create a New Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
