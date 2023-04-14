import { db } from "../connect.js";
import moment from "moment";

export const getExercises = (req, res) => {
  const q = `SELECT * FROM mogDB.exercises ORDER BY exerciseName ASC`;

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
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
      return "inserted data for exerciseID: " + req.query.exerciseIDValue;
    }
  );
};
