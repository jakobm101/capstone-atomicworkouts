import mongoose from "mongoose";

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  name: { type: String, required: true },
  exercises: [
    {
     exerciseId: {
    type: Schema.Types.ObjectId,
    ref: "Exercise", // Enables populate() if required
    required: true,
  },
      sets: Number,
      reps: Number,
    },
  ],
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
export default Workout;