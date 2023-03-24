import "./navbar.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>MOG</span>
        </Link>
        <HomeRoundedIcon className="navbarIcon" />
        {darkMode ? (
          <LightModeRoundedIcon className="navbarIcon" onClick={toggle} />
        ) : (
          <DarkModeRoundedIcon className="navbarIcon" onClick={toggle} />
        )}
        <div className="search">
          <PersonSearchRoundedIcon className="navbarIcon" />
          <input type="text" placeholder="Search for other users" />
        </div>
      </div>
      <div className="right">
        <InboxRoundedIcon className="navbarIcon" />
        <div className="user">
          <img src={currentUser.profilePic} alt="Profile" />
          <span>
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>
        <LogoutRoundedIcon className="navbarIcon" onClick={logout} />
      </div>
    </div>
  );
};

export default Navbar;
