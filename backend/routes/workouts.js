import express from "express";
import {
  getExercises,
  postWorkoutSet,
  postWorkout,
} from "../controllers/workout.js";

const router = express.Router();

router.get("/exercises/", getExercises);
router.post("/postworkout/", postWorkout);
router.post("/postworkoutset/", postWorkoutSet);

export default router;
