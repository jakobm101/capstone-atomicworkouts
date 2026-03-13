import mongoose from "mongoose";

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  // owner: "20402329",
  //  isPublic: {}
  name: { type: String, required: true },
  exercises: [
    {
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercise", // Enables populate() if required
        required: true,
      },
      sets: { type: Number, min: 1, default: 3 },
      reps: { type: Number, min: 1, default: 10 },
    },
  ],
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
export default Workout;
