import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const configuration = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };

        if (body) {
          configuration.body = JSON.stringify(body);
        }

        const response = await fetch(url, configuration);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        setError(err.message || "Ooops something went wrong");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, error, isLoading, request };
};

export default useFetch;
