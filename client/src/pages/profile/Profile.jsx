import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Update from "../../components/update/Update";

const Profile = () => {
  window.scrollTo(0, 0);

  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userID = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userID).then((res) => {
      console.log(res.data);
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
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
        return makeRequest.delete("/relationships?userID=" + userID);
      return makeRequest.post("/relationships?userID=" + userID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
        queryClient.invalidateQueries(["checkedIn"]);
        queryClient.invalidateQueries(["suggestions"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(userID));
    console.log("relationshipData:");
    console.log(relationshipData);
    console.log(relationshipData.includes(userID));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img
              src={"/upload/" + data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{data.userName}</span>
                <div className="info">
                  <div className="item" id="cityDiv">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item" id="streakDiv">
                    <span>
                      Current Streak: {data.streak ? data.streak : 0}🔥
                    </span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userID === currentUser.userID ? (
                  <button id="editButton" onClick={() => setOpenUpdate(true)}>
                    <EditRoundedIcon></EditRoundedIcon>Edit Profile
                  </button>
                ) : (
                  <button id="followButton" onClick={handleFollow}>
                    {relationshipData.includes(userID) ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>
            <div className="separator">POSTS</div>
            <Posts userID={userID} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
