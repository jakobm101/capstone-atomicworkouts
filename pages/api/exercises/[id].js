import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Exercise not found." });
    }
    const exercises = await Exercise.findById(id);

    if (!exercises) {
      return res.status(404).json({ error: "Exercise not found." });
    }

    return res.status(200).json(exercises);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
