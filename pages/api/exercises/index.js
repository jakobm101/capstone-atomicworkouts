import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req: req });
  const userId = token?.sub;
  await dbConnect();
  const exercises = await Exercise.find({
    $or: [{ owner: undefined }, { owner: userId }],
  });
  res.status(200).json(exercises);
  return;
}
