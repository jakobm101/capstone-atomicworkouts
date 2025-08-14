import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <Link href={`/`}>Home</Link>
      <Link href={`/exercises`}>Exercises</Link>
      <Link href={`/workouts`}>Workouts</Link>
    </div>
  );
}
