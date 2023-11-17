import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../Theme";
import { AuthContext } from "../auth/AuthContext";
import dark from "../theme/dark.png";
import light from "../theme/light.png";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, UnTrigger } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    UnTrigger();
    navigate("/");
  };

  console.log({ isAuthenticated });

  return (
    <div>
      <div id="main-navbar" className="navbar">
        <h2 className="logo">
          <Link to="/">Weather App</Link>
        </h2>
        <nav>
          <ul>
            <li>
              <div className="header-toggle-buttons">
                <button onClick={() => toggleTheme()}>
                  {theme === "light-theme" ? (
                    <img src={dark} alter="light" width="30" />
                  ) : (
                    <img
                      src={light}
                      alter="light"
                      width="30"
                      className="bg-white"
                    />
                  )}
                </button>
              </div>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout}>Sign Out</button>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
