import ExerciseList from "@/components/Exercises/ExerciseList";

export default function HomePage({ data }) {
  return (
    <div>
      <ExerciseList data={data} />
    </div>
  );
}
