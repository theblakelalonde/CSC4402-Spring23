import { db } from "../connect.js";
import moment from "moment";
import jwt from "jsonwebtoken";

export const getExercises = (req, res) => {
  const q = `SELECT * FROM mogDB.exercises ORDER BY exerciseName ASC`;

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserWorkouts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT DATE(date) as date FROM mogDB.workouts WHERE userID = ?;`;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getWorkoutForDate = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT ws.*, e.exerciseName
    FROM mogDB.workoutSets ws
    JOIN mogDB.workouts w ON ws.workoutID = w.workoutID
    JOIN mogDB.exercises e ON ws.exerciseID = e.exerciseID
    WHERE w.userID = ? AND w.date LIKE ?;
    `;

    db.query(q, [userInfo.id, req.query.date + "%"], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const postWorkout = (req, res) => {
  const dateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const userID = req.query.userID;

  const q = `INSERT INTO mogDB.workouts (userID, date) VALUES (?, ?);SELECT workoutID FROM mogDB.workouts WHERE userID = ? AND date = ?;`;

  db.query(q, [userID, dateTime, userID, dateTime], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[1][0].workoutID);
  });
};

export const postWorkoutSet = (req, res) => {
  const q = `INSERT INTO mogDB.workoutSets (workoutID, exerciseID, sets, reps, weight) VALUES (?, ?, ?, ?, ?);`;

  db.query(
    q,
    [
      req.query.workoutID,
      req.query.exerciseIDValue,
      req.query.setsValue,
      req.query.repsValue,
      req.query.weightValue,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
