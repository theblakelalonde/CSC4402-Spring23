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
import { QueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const liked = false;
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const deleteMutation = useMutation(
    (postID) => {
    return makeRequest.delete("/posts/" + postID);
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries(["posts"])
      }
    }
  )

  const handleDelete = () =>{
    deleteMutation.mutate(post.postsID)
  }

  // console.log(post);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
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
          <MoreHorizIcon className="threeDots" onClick={()=>setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userID === currentUser.userID && 
          <button onClick={handleDelete}>Delete</button>}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            69 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />3 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            10 Shares
          </div>
        </div>
        {commentOpen && <Comments postID={post.postsID} />}
      </div>
    </div>
  );
};

export default Post;
