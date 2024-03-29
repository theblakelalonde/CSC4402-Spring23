import Suggestions from "../suggestions/Suggestions";
import CheckedInContainer from "../checked-in-container/CheckedInContainer";
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
        <CheckedInContainer userID={currentUser.userID} />
      </div>
    </div>
  );
};

export default RightBar;
