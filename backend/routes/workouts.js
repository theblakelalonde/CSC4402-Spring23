import express from "express";
import {
  getExercises,
  postWorkoutSet,
  postWorkout,
  getUserWorkouts,
  getWorkoutForDate,
} from "../controllers/workout.js";

const router = express.Router();

router.get("/exercises/", getExercises);
router.get("/workoutdates/", getUserWorkouts);
router.get("/workoutfordate/", getWorkoutForDate);
router.post("/postworkout/", postWorkout);
router.post("/postworkoutset/", postWorkoutSet);

export default router;
