import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import Workout from "@/db/Schema/Workout";

export default async function handler(_, res) {
  await dbConnect();
  const workout = await Workout.findOne();
  const array = workout.exercises.map((exercise) => exercise.exerciseId);
  const workoutName = workout.name;

  //$in -- is some Mongo Magic array mapping
  const exercises = await Exercise.where({ id: { $in: array } });
  const exerciseNames = exercises.map((exercise) => exercise.name);

  res.status(200).json({ exerciseNames, workoutName });
  return;
}
