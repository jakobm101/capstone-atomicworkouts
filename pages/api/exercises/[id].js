import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";

export default async function handler(req, res) {
  const result = await auth.api.getSession({ headers: req.headers });
  console.log("☎️", result?.user.id);
  if (!result) {
    res.status(401).json({ error: "doh" });
    return;
  }
  try {
    await dbConnect();
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Exercise not found." });
      return;
    }
    const exercises = await Exercise.findById(id);

    if (!exercises) {
      res.status(404).json({ error: "Exercise not found." });
      return;
    }

    return res.status(200).json(exercises);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
