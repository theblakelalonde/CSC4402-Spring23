import "./navbar.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            alt="Profile"
          />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
