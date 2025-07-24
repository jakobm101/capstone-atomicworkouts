import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ButtonAdd({ href = `/workouts/form`, ...props }) {
  return (
    <Link href={href} {...props}>
      <PlusCircle />
    </Link>
  );
}
