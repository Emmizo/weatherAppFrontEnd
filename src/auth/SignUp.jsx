import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BaseURL from "../BaseURL";
import * as http from "../config/axiosConfig";
import { AuthContext } from "../auth/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordConfError, setPasswordConfError] = useState("");
  const[loading,setLoading]=useState(false)

  const { TriggerToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = {
        name,
        email,
        password,
        password_confirmation,
      }
      http.POST("/signUp", data).then((resp)=>{
        setLoading(false)
        localStorage.setItem("token", resp?.data?.token);
        TriggerToken();
        navigate("/");
      }).catch(err=>console.log(err));
      
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto w-[80%] mt-[50px] flex justify-center items-center     ">
      <div className={"  text-center font-bold text-2xl   "}>
        <div className={""}>
          <div>Sign Up</div>
        </div>
        <form onSubmit={handleRegistration}>
          <br />
          <div className={"inputContainer"}>
            <input
              value={name}
              placeholder="Enter your name here"
              onChange={(e) => setName(e.target.value)}
              className={"inputBox dark:text-black"}
              required
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              className={"inputBox dark:text-black"}
              required
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              type="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
              className={"inputBox dark:text-black"}
              required
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />

          <div className={"inputContainer"}>
            <input
              type="password"
              value={password_confirmation}
              placeholder="Confirm your password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={"inputBox dark:text-black"}
              required
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="">
            <input className={"w-[100%]"} type="submit" value={loading?"Loading....":"Sign up"} />

            <div className="mt-3 text-center text-base font-normal">
              You don't have account?{" "}
              <span
                className=" text-blue-500 pl-3 hover:cursor-pointer "
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
