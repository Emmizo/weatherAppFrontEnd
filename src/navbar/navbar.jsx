import React, { useContext, useEffect } from "react";
import { Navigate, Link ,useNavigate} from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../Theme";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {isAuthenticated,UnTrigger }= useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    UnTrigger()
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
                <button onClick={() => toggleTheme()}>{theme}</button>
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
