import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Profile = () => {
  window.scrollTo(0, 0);

  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userID = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userID).then((res) => {
      console.log("inside query in Profile.jsx. user object: " + res.data);
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
          console.log("relationshipData: ");
          console.log(res.data);
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
            <img
              src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="cover"
            />
            <img src={data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{data.userName}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>Baton Rouge</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>Mog</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userID === currentUser.userID ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
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
    </div>
  );
};

export default Profile;
