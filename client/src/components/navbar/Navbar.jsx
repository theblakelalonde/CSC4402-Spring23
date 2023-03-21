import "./navbar.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>MOG</span>
        </Link>
        <HomeRoundedIcon className="navbarIcon" />
        <DarkModeRoundedIcon className="navbarIcon" />
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
      </div>
    </div>
  );
};

export default Navbar;
