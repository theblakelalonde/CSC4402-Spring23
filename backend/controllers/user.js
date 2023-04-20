import { db } from "../connect.js";

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
