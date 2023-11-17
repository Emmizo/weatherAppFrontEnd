import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import BaseURL from "../BaseURL";
import axios from "axios";
import * as http from "../config/axiosConfig";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const[loading,setLoading]=useState(false)

  const { TriggerToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = { email, password };
    try {
       http.POST("/signIn", data).then((resp)=>{
        localStorage.setItem("token", resp?.data?.token);
      TriggerToken();
      navigate("/");
      });
      
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  return (
    <div className="  mx-auto w-[80%] mt-[100px] flex justify-center items-center   ">
      <div className={""}>
        <div className={" text-center font-bold text-2xl"}>
          <div>Login</div>
        </div>
        <br />
        <form onSubmit={handleLogin}>
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
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
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox dark:text-black"}
              required
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="">
            <input className={"w-[100%]"} type="submit" value={loading?"Loading....":"Log in"} />

            <div className="mt-3 text-center">
              You don't have account?{" "}
              <span className=" text-blue-500 pl-3 hover:cursor-pointer " onClick={()=> navigate('/SignUp')}>
              Sign Up
              </span>
             
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
