import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postID }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments" + postID], () =>
    makeRequest.get("/comments?postID=" + postID).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments" + postID]);
      },
    }
  );

  const openCommentMenu = (commentID, userID) => {
    var element = document.getElementById(commentID);
    if (userID === currentUser.userID) {
      if (element.style.display === "none") {
        element.style.display = "initial";
      } else {
        element.style.display = "none";
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postID });
    setDesc("");
  };

  const deleteCommentMutation = useMutation(
    (commentID) => {
      return makeRequest.delete("/comments/" + commentID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments" + postID]);
      },
    }
  );

  const handleDeleteComment = (commentID) => {
    deleteCommentMutation.mutate(commentID);
    var element = document.getElementById(commentID);
    element.style.display = "none";
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <SendRoundedIcon className="sendButton" onClick={handleClick} />
        {/* <button>Send</button> */}
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.commentID}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <div className="commentUserInfo">
                  <span className="bioName">
                    {comment.firstName} {comment.lastName}
                  </span>
                  <span className="userName"> (@{comment.userName})</span>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
                <p>{comment.desc}</p>
              </div>
              <MoreHorizIcon
                className="threeDots"
                onClick={() =>
                  openCommentMenu(comment.commentID, comment.userID)
                }
              />
              <button
                id={comment.commentID}
                style={{ display: "none" }}
                onClick={() => handleDeleteComment(comment.commentID)}
              >
                Delete
              </button>
            </div>
          ))}
    </div>
  );
};

export default Comments;
