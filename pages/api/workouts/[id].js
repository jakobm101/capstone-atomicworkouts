import dbConnect from "@/db/connect";
import Workout from "@/db/Schema/Workout";
// necessary import for populate:
import Exercise from "@/db/Schema/Exercise";

export default async function handler(req, res) {
  ///// GET
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
}
