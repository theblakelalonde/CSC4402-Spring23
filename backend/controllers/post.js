import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userID = req.query.userID;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Filters posts to only see posts from people you followed and yourself
    const q =
      userID != "undefined"
        ? `SELECT distinct p.*, u.userID as uID, firstName, lastName, userName, profilePic FROM posts AS p 
        JOIN users AS u ON (u.userID = p.userID) AND p.userID = ?
        ORDER BY p.createdAt DESC`
        : `SELECT distinct p.*, u.userID as uID, firstName, lastName, userName, profilePic FROM posts AS p 
    JOIN users AS u ON (u.userID = p.userID)
    LEFT JOIN relationships AS r ON (p.userID = r.followedUserID) WHERE r.followerUserID= ? OR p.userID =?
    ORDER BY p.createdAt DESC`;

    const values =
      userID != "undefined" ? [userID] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Filters posts to only see posts from people you followed and yourself
    const q =
      "INSERT INTO posts (`desc`, `img`, `createdAt`, `userID`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `postsID` = ? AND `userID` = ?";

    db.query(q, [req.params.postID, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can only delete your posts.");
    });
  });
};
