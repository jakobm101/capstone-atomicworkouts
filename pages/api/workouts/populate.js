import dbConnect from "@/db/connect";
import Workout from "@/db/Schema/Workout";

export default async function handler(_, res) {
  await dbConnect();
  const workouts = await Workout.find().populate("exercises.exerciseId");

  return res.status(200).json(workouts);
}
