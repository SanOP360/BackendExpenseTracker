import React, { useRef } from "react";
import axios from "axios";
import "./loginStyles.css";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitForm = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:5000/users/signup", { name, email, password })
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });

      nameRef.current.value=null;
      emailRef.current.value=null;
      passwordRef.current.value=null;
  };

  return (
    <div className="MainDiv">
      <form onSubmit={submitForm} className="custom-form">
        <h1 className="heading">SIGN UP</h1>

        <div className="sub-form">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" name="name" ref={nameRef} className="form-input" />
        </div>

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
            Submit
          </button>
        </div>

        <div className="divLink">
          <Link className="link" to="/">
            Already have an account? Login from here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
