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

  const handleCreateWorkout = async (workoutData) => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) throw new Error("Failed to create");

      router.push("/workouts");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // JSX Main
  return (
    <main>
      <h1>Creating Workout</h1>
      <WorkoutForm
        onSubmit={handleCreateWorkout}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        workoutPreview={workoutPreview}
        setWorkoutPreview={setWorkoutPreview}
      />
    </main>
  );
}
