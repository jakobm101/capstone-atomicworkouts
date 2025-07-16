import dbConnect from "../../../db/connect";
import Exercise from "../../../db/Schema/Exercise";
import libMusclegroups from "../../../lib/musclegroups";

export default async function handler(req, res) {
  let query = req.query.musclegroup;
  // Capitalize
  query = query[0].toUpperCase() + query.slice(1);

  if (!libMusclegroups.find((muscle) => muscle === query))
    return res.status(500).json({ error: "Muscle not found" });

  try {
    await dbConnect();
    const exercises = await Exercise.find({
      muscleGroups: query,
    });

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
