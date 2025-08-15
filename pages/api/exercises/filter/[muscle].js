import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { muscle } = req.query;

    const exercises = await Exercise.find((exercise) =>
      exercise.muscleGroups.includes(muscle)
    );

    if (!exercises) {
      return res.status(404).json({ error: "Exercise not found." });
    }

    return res.status(200).json(exercises);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
