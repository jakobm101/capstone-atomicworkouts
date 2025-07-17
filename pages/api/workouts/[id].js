import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import Workout from "@/db/Schema/Workout";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const workout = await Workout.findById(req.query.id);

    //$in -- is some Mongo Magic array mapping
    const exerciseIds = workout.exercises.map(
      (exercise) => exercise.exerciseId
    );
    const exercises = await Exercise.find({ id: { $in: exerciseIds } });
    const exerciseNames = exercises.map((exercise) => exercise.name);

    const workoutName = workout.name;
    res.status(200).json({ exerciseNames, workoutName });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
