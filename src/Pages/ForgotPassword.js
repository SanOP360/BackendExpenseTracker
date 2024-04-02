import React, { useState } from "react";
import axios from "axios";
import "./forgotPasswordStyles.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/password/forgotpassword",
        {
          email: email,
        }
      );
      console.log(response.data);
      setMessage(response.data.msg);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="forgot-password">
      <h1>Reset Your Password</h1>
      <form onSubmit={resetPasswordHandler}>
        <label htmlFor="email">Enter your registered email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
