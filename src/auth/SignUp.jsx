import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BaseURL from "../BaseURL";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordConfError, setPasswordConfError] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BaseURL + "signUp", {
        name,
        email,
        password,
        password_confirmation,
      });
      // Handle successful registration
      console.log(response.data);
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  return (
    <div className="SignUp">
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Sign Up</div>
        </div>
        <form onSubmit={handleRegistration}>
          <br />
          <div className={"inputContainer"}>
            <input
              value={name}
              placeholder="Enter your name here"
              onChange={(e) => setName(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />

          <div className={"inputContainer"}>
            <input
              value={password_confirmation}
              placeholder="Confirm your password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="row-button">
            <div className={"inputContainer"}>
              <input
                className={"inputButton"}
                type="submit"
                value={"Sign Up"}
              />
            </div>

            <div className="mt-3">
              You already have account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
