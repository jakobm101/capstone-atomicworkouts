import WorkoutForm from "@/components/WorkoutForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "uid";

export default function WorkoutCreate() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "New Workout",
    exercises: [{ _id: uid(), exercise: "" }],
  });

  const handleCreateWorkout = async (e) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const newExercisesList = workoutPreview.exercises.map((_, index) => {
        return { exercise: data[`exercise-${index}`] };
      });

      const workoutInSubmit = {
        name: data.workoutName,
        exercises: newExercisesList,
      };

      // Posting to database
      const response = await fetch(`/api/workouts`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutInSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }
      router.push("/workouts");
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Failed to create workout: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // JSX Main
  return (
    <main>
      <h1>Creating Workout</h1>
      <WorkoutForm
        onSubmit={handleCreateWorkout}
        isSubmitting={isSubmitting}
        workoutPreview={workoutPreview}
        setWorkoutPreview={setWorkoutPreview}
      />
    </main>
  );
}
