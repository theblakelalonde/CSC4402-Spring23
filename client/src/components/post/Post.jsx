import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["likes", post.postsID], () =>
    makeRequest.get("/likes?postID=" + post.postsID).then((res) => {
      return res.data;
    })
  );

  const { isLoading: loadingComment, data: commentData } = useQuery(
    ["comments" + post.postsID],
    () =>
      makeRequest.get("/comments?postID=" + post.postsID).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postID=" + post.postsID);
      return makeRequest.post("/likes", { postID: post.postsID });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.userID));
  };

  const deleteMutation = useMutation(
    (postID) => {
      return makeRequest.delete("/posts/" + postID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.postsID);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="bioName">
                  {post.firstName} {post.lastName}
                </span>
                <span className="userName"> @{post.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            className="threeDots"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && post.userID === currentUser.userID && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.userID) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentData?.length} Comments
          </div>
        </div>
        {commentOpen && <Comments postID={post.postsID} />}
      </div>
    </div>
  );
};

export default Post;
