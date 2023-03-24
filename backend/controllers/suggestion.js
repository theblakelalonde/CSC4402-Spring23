import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getSuggestions = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `select userID, userName, firstName, lastName, profilePic
  from mogDB.users where userID in
  (select distinct followedUserId 
  from mogDB.relationships
  where followerUserID in ( 
      select followedUserID
      from mogDB.relationships
      where followerUserID = ?)
  and followedUserID not in (
      select followedUserID
      from mogDB.relationships
      where followerUserID = ?)
  and followedUserID != ?)
  order by rand()
  limit 3;`;

    db.query(q, [userInfo.id, userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
