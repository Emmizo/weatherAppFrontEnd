import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Content from "./content/content";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Header from "./newHeader/siteHeader"
import { ThemeContext } from "./Theme";

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`App ${theme}`}>
      <Header />
      <Routes>
        <Route index element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
