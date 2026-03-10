import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"

export default function ProfilePage(){
	const { status } = useSession();
	if (status !== "authenticated") return (
		<Layout>
			<h1>Access denied</h1>
		</Layout>
	)
	return (
	<Layout>
		<h1>Profile Page</h1>
	</Layout>)
}
