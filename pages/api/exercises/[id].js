import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session) {
      await dbConnect();
      const { id } = req.query;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Exercise not found." });
      }
      const exercise = await Exercise.findById(id);

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found." });
      }

      return res.status(200).json(exercise);
    } else {
      return res.status(401).json({ status: "Not authorized" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
