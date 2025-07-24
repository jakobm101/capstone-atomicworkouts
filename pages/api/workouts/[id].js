import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import Workout from "@/db/Schema/Workout";

export default async function handler(req, res) {
  ///// GET
  if (req.method === "GET") {
    try {
      await dbConnect();
      const workout = await Workout.findById(req.query.id);

      //$in -- is some Mongo Magic array mapping
      const exerciseIds = workout.exercises.map(
        (exercise) => exercise.exerciseId
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
}
