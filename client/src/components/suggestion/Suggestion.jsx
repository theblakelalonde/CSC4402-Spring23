import "./suggestion.scss";
// import RightBar from "../rightbar/RightBar";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Suggestion = ({ user }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="suggestionItem">
      <div className="user">
        <div className="userInfo">
          <img src={user.profilePic} alt="" />
          <p>
            <span id="bioName">
              {user.firstName} {user.lastName}
            </span>
            &nbsp;@{user.userName}
          </p>
        </div>
        <div className="buttons">
          <button>FOLLOW</button>
        </div>
      </div>
    </div>
  );
};
export default Suggestion;
