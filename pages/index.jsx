import Layout from "@/components/Layout";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout>
      <h2>Atomic Workouts</h2>
      <Link href={"/workouts"}>Workouts</Link>
      <Link href={"/exercises"}>Exercises</Link>
    </Layout>
  );
}
