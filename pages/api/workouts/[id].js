import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import Workout from "@/db/Schema/Workout";

export default async function handler(req, res) {
  ///// GET
  if (req.method === "GET") {
    try {
      await dbConnect();
      const workout = await Workout.findById(req.query.id);
      const exerciseIds = workout.exercises.map(
        (exercise) => exercise._id
      );
      const exercises = await Exercise.find({ id: { $in: exerciseIds } });
      res.status(200).json({ workout, exercises });
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
  ////////////////////// UPDATE
  if (req.method === "PUT") {
    try {
      console.log("req.body", req.body);

      await dbConnect();
      await Workout.findByIdAndUpdate(req.query.id, req.body);
      res.status(200).json({
        message: `created workout ${req.body.name}`,
        workout: req.body,
      });
      return;
    } catch (error) {
      res.status(500).json({ error: error.message, body: req.body });
      return;
    }
  }
  res.status(404).json({ message: "Method not supported" });
  return;
}
