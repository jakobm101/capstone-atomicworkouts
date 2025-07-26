import dbConnect from "@/db/connect";
import Workout from "@/db/Schema/Workout";

export default async function handler(req, res) {
  ///////////////////////////////// GET
  if (req.method === "GET") {
    try {
      await dbConnect();
      const workouts = await Workout.find().sort({ createdAt: -1 });
      res.status(200).json(workouts);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
  ///////////////////////////////// CREATE
  if (req.method === "POST") {
    try {
      dbConnect();
      await Workout.create(req.body);
      res.status(200).json({ message: "posting" });
      return;
    } catch (error) {
      console.error("error posting", error.message);

      res.status(500).json({ error: error.message });
      return;
    }
  }
  return res.status(404).json({ message: "try GET or POST here" });
}
