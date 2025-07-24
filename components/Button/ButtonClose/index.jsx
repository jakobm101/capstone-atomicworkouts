import { X } from "lucide-react";
import Link from "next/link";

export default function ButtonClose({ href, ...props }) {
  return (
    <Link href={href} {...props}>
      <X />
    </Link>
  );
}
