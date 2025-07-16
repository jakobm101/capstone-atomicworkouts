import mongoose from "mongoose";

const { Schema } = mongoose;

const ExerciseSchema = new Schema(
  {
    id: { type: String, required: true }, // unique string ID
    name: { type: String, required: true }, // exercise name (e.g. Push-Up)
    muscleGroups: [{ type: String }], // array of targeted muscles
    imageUrl: { type: String }, // (optional) image link
    instructions: [{ type: String }], // list of how-to steps
  },
  { timestamps: true }
);

// Avoid model overwrite in dev
const Exercise =
  mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);

// load data
export default Exercise;
