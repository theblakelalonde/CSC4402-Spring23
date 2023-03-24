import Suggestions from "../suggestions/Suggestions";
import "./rightBar.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="rightBar">
      <div className="container">
        <Suggestions userID={currentUser.userID} />
        <div className="item">
          <span>Latest Activites</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover photo
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> made a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> updated their bio
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> edited an activity
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
