// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import Workout from "@/db/Schema/Workout";
import libExercises from "@/lib/exercises";
import libWorkouts from "@/lib/workouts";

export default async function handler(_, res) {
  await dbConnect();
  const workouts = Workout.create(libWorkouts);
  const exercises = Exercise.create(libExercises);

  res.status(200).json({ workouts, exercises });
  return;
}
