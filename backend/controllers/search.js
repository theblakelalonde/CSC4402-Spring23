import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getSearchQuery = (req, res) => {
  const q =
    "SELECT userID, userName, firstName, lastName, profilePic FROM users WHERE userName LIKE ? OR concat(firstName, ' ', lastName) like ?";

  db.query(
    q,
    ["%" + req.query.searchText + "%", "%" + req.query.searchText + "%"],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
