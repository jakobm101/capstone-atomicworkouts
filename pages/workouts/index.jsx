import Link from "next/link";

export default function WorkoutsPage() {
  return (
    <main>
      <h2>Workouts</h2>
      <h3>here be a list</h3>
      <Link href={`/`}>home</Link>
    </main>
  );
}
