import { authClient } from "@/lib/auth";

export default function WhenLoggedIn({ children, fallback = null }) {
  const { data: authdata } = authClient.useSession();
  if (!authdata) return fallback;
  return children;
}
