import dbConnect from "@/db/connect";
import Workout from "@/db/Schema/Workout";
// necessary import for populate:
import Exercise from "@/db/Schema/Exercise";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req: req });
  const userId = token?.sub;
  if (req.method === "GET") {
    try {
      await dbConnect();
      const workout = await Workout.findById(req.query.id).populate(
        "exercises.exercise"
      );

      res.status(200).json(workout);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
  if (req.method === "DELETE") {
    try {
      await dbConnect();
      await Workout.findByIdAndDelete(req.query.id);
      res.status(200).json({ message: "deleted" });
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
  if (req.method === "PUT") {
    try {
      await dbConnect();
      await Workout.findByIdAndUpdate(req.query.id, {
        $set: {
          ...req.body,
          owner: userId,
          isPublic: false,
        },
      });
      res.status(200).json({
        status: `⭐️ Workout ${req.query.id} updated: ${req.body}`,
      });
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
}
