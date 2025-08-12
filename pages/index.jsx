import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h2>Atomic Workouts</h2>
      <Link href={"/workouts"}>Workouts</Link>
    </main>
  );
}
