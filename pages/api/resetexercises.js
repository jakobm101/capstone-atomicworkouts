import dbConnect from "../../../db/connect";
import { fillExerciseCollection } from "../../../db/fillDBwithSampleData";
import Exercise from "../../../db/Schema/Exercise";

export default async function handler(_, res) {
  await dbConnect();
  await Exercise.deleteMany();
  await fillExerciseCollection();
  const exercises = await Exercise.find();

  res.status(200).json(exercises.map((ex) => ex.name));
  return;
}
