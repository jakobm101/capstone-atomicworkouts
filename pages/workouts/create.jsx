import WorkoutForm from "@/components/WorkoutForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function WorkoutCreate() {
  const router = useRouter();

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

  return (
    <main>
      <h1>Creating Workout</h1>
      <WorkoutForm onSubmit={handleCreateWorkout} />
      <Link href={`/`}>home</Link>
    </main>
  );
}
