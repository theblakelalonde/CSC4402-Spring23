import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getCheckedIns = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `select users.userID, firstName, lastName, profilePic, isCheckedIn, isResting, checkInDate, streak from users, checkIn where users.userID in 
    (select followedUserId from mogDB.relationships where followerUserId = ? ) 
    AND checkInDate IN (SELECT max(checkInDate) FROM checkIn where users.userID = checkIn.userID )`;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addCheckedIns = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE mogDB.users SET isCheckedIn=1 WHERE userID=?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      //return res.status(200).json(data);

      const q = `INSERT INTO checkIn (userID, isResting, streak, checkInDate)
      SELECT 
        ?,
        ?,
        CASE 
          WHEN ? = 1 AND EXISTS(SELECT * FROM checkIn WHERE userID = ? AND DATE(checkInDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY))
          THEN (SELECT streak FROM checkIn WHERE userID = ? AND DATE(checkInDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY))
          WHEN ? = 1 
          THEN 0
          WHEN ? <> 1 AND NOT EXISTS(SELECT * FROM checkIn WHERE userID = ? AND DATE(checkInDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY))
          THEN 1
          ELSE (SELECT streak + 1 FROM checkIn WHERE userID = ? AND DATE(checkInDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY))
          END,
        NOW()
      `;

      db.query(
        q,
        [
          userInfo.id,
          req.body.status,
          req.body.status,
          userInfo.id,
          userInfo.id,
          req.body.status,
          req.body.status,
          userInfo.id,
          userInfo.id,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        }
      );
    });
  });
};
