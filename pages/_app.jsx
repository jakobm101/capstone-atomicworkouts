import GlobalStyle from "../styles";
import { spaceMono } from "@/lib/fonts";
import { SWRConfig,  } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <div className={spaceMono.className}>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              const errorData = await response.json();
              const error = new Error(
                errorData.error || "An unknown error occurred"
              );
              error.status = response.status;
              throw error;
            }
            return await response.json();
          },
        }}
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
}
