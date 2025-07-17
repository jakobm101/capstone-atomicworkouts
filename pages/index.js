import Heading from "@/components/Atoms/Text/Heading";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import WorkoutsList from "@/components/Workouts/WorkoutsList";

export default function HomePage() {
  return (
    <div>
    <HeadingTiny>atomic workouts</HeadingTiny>
    <Heading>Workouts List</Heading>
    <WorkoutsList/>
    </div>
  );
}
