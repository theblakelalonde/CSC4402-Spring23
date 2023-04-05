import "./suggestion.scss";
// import RightBar from "../rightbar/RightBar";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Suggestion = ({ user }) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading: rIsLoading, data: suggestionRelationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest
        .get("/relationships?followerUserID=" + currentUser.userID)
        .then((res) => {
          console.log("suggestionRelationshipData: ");
          console.log(res.data);
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
            <span id="bioName">
              {user.firstName} {user.lastName}
            </span>
            &nbsp;@{user.userName}
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
