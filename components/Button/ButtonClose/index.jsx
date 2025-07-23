import { X } from "lucide-react";
import Link from "next/link";

export default function ButtonClose({ href }) {
  return (
      <Link href={href}>
        <X />
      </Link>
  );
}
