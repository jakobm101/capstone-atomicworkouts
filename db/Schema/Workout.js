import mongoose from "mongoose";

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  name: { type: String, required: true },
  exercises: [
    {
      exerciseId: String,
      sets: Number,
      reps: Number,
    },
  ],
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
export default Workout;
