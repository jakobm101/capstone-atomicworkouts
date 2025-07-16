import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const exercises = await Exercise.findById(req.query.exercise);

    res.status(200).json(exercises);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
