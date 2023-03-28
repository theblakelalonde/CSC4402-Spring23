import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Post = ({ post }) => {
  const liked = true;
  const [commentOpen, setCommentOpen] = useState(false);

  const { isLoading, error, data } = useQuery(["likes", post.postsID], () =>
    makeRequest.get("/likes?postID=" + post.postsID).then((res) => {
      console.log("likes res.data: " + res.data);
      return res.data;
    })
  );

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
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {data === undefined ? 0 : data.length} Likes
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
