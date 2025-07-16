// fills the Workout Collection with the example data from next-server

import Exercise from "./Schema/Exercise.js";
import Workout from "./Schema/Workout.js";
import libExercises from "../lib/exercises.js";
import libWorkouts from "../lib/workouts.js";

export const fillExerciseCollection = async () => {
  for (const item of libExercises) {
    await Exercise.create(item);
  }
};

export const fillWorkoutCollection = async () => {
  for (const item of libWorkouts) {
    await Workout.create(item);
  }
};
