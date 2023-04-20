import "./suggestion.scss";
// import RightBar from "../rightbar/RightBar";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Suggestion = ({ user }) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading: rIsLoading, data: suggestionRelationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest
        .get("/relationships?followerUserID=" + currentUser.userID)
        .then((res) => {
          return res.data;
        })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userID=" + user.userID);
      return makeRequest.post("/relationships?userID=" + user.userID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
        queryClient.invalidateQueries(["checkedIn"]);
        queryClient.invalidateQueries(["suggestions"]);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(suggestionRelationshipData.includes(user.userID));
  };

  return (
    <div className="suggestionItem">
      <div className="user">
        <div className="userInfo">
          <img src={user.profilePic} alt="" />
          <p>
            <Link
              reloadDocument
              to={`/profile/${user.userID}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="bioName" id="bioName">
                {user.firstName} {user.lastName}
              </span>
              &nbsp;@{user.userName}
            </Link>
          </p>
        </div>
        <div className="buttons">
          <button onClick={handleFollow} id={"followButton" + user.userID}>
            {rIsLoading
              ? "Loading"
              : suggestionRelationshipData.includes(user.userID)
              ? "Following"
              : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Suggestion;
