import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res)=>{
      const q = "SELECT userID FROM likes WHERE postID = ?";  
  
      db.query(q, [req.query.postID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    }