import useSWR from "swr";

export default function Update() {
  const { data: workouts } = useSWR(`/api/workouts`, (url) => fetch(url));
  return <>hello world</>;
}
