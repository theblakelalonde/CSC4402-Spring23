import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getCheckedIns = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `select userId, firstName, lastName, profilePic, isCheckedIn, isRestingToday, checkedInTime, checkedInStreak from mogDB.users where userID in (select followedUserId from mogDB.relationships where followerUserId = ?) and (isCheckedIn = 1 or isRestingToday = 1);`;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
