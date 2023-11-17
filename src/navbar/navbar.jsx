import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../Theme";
import { AuthContext } from "../auth/AuthContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiSun } from "react-icons/ci";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, UnTrigger } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    UnTrigger();
    navigate("/");
  };

  return (
    <div>
      <div id="main-navbar" className="navbar p-2">
        <h2 className="logo">
          <Link to="/">Weather App</Link>
        </h2>
        <nav>
          <ul className="flex flex-row items-center">
            <li>
              <div className="">
                <button onClick={() => toggleTheme()}>
                  {theme === "light-theme" ? (
                    <CiSun size={30} />
                  ) : (
                    <MdOutlineDarkMode size={30} />
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
