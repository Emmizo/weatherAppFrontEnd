import React, { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import BaseURL from "../BaseURL";
import axios from "axios";
import * as http from '../config/axiosConfig'
import {AuthContext} from '../auth/AuthContext'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { TriggerToken } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  const data = {email,password}
    try {
     const resp = await http.POST('/signIn',data)
      localStorage.setItem("token",resp?.data?.token)
      TriggerToken()
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Login</div>
        </div>
        <br />
        <form onSubmit={handleLogin}>
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="row-button">
            <div className={"inputContainer"}>
              <input className={"inputButton"} type="submit" value={"Log in"} />
            </div>
            <div className="mt-3">
              You don't have account? <Link to="/SignUp">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
