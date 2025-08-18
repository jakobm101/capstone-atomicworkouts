import Layout from "@/components/Layout";
import Timer from "@/components/Timer";
import { useState } from "react";

export default function TimerPage() {
  const [sets, setSets] = useState(0);
  return (
    <Layout>
      <Timer setCount={setSets} />
      <h2>Sets: {sets}</h2>
    </Layout>
  );
}
