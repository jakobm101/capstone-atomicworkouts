import GlobalStyle from "../styles";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";

export default function App({ Component, pageProps }) {
  const { data, error, isLoading, request } = useFetch();
  const baseURL = "http://localhost:3000/api/";

  //Fetch exercise data. Rather than call this here in the app and send down. We could just as easily use this hook where we
  //need to use it. I have used it here just to demonstrate it.
  useEffect(() => {
    const fetchData = async () => {
      try {
        await request(`${baseURL}exercises`, "GET");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [request]);

  if (isLoading) return <p>Loading....</p>; //Or loading page
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} data={data} />
    </>
  );
}

//As we have seen above we can use this custom hook to fetch data. We can just as easily post, put and delete data using this hook.

//For example if we wanted to post a new workout to the backend we would do the following.
// const { data, error, isLoading, request } = useFetch();
// const baseURL = "http://localhost:3000/api/";
// const body = formData   //for example
// const headers = {headers: { "Content-Type": "application/json" }}

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       await request(`${baseURL}post`, "POST", body, headers );
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchData();
// }, [request]);
