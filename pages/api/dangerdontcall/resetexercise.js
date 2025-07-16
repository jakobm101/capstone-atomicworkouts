import dbConnect from "@/db/connect";
import Exercise from "@/db/Schema/Exercise";


export default async function handler(_, res) {
  await dbConnect();
  await Exercise.deleteMany();

  res.status(200).json();
  return;
}
