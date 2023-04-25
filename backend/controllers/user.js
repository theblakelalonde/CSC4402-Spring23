import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userID;
  // console.log("user.js userId is: " + userId);
  const q = "SELECT * FROM users WHERE userID=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `email`=?, `firstName`=?,`lastName`=?, `userName`=?,`city`=?, `profilePic`=?,`coverPic`=? WHERE userID=? ";

    db.query(
      q,
      [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.userName,
        req.body.city,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows === 0)
          return res.status(403).json("You can update only your post!");

        const q =
          "SELECT userID, userName, email, firstName, lastName, profilePic, coverPic, city, isCheckedIn from users WHERE userID = ?";

        db.query(q, userInfo.id, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      }
    );
  });
};
