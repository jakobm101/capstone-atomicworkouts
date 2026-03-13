import { authClient } from "@/lib/auth-client";

export default function AuthButton() {
  const { data: authdata } = authClient.useSession();
  const handleLogin = () => {
    authClient.signIn.social({ provider: "github" });
  };
  const handleLogOut = () => {
    authClient.signOut();
  };
  console.log("😸", authdata);
  return (
    <button onClick={authdata ? handleLogOut : handleLogin}>
      Log {authdata ? "Out" : "In"}
    </button>
  );
}
