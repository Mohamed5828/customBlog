import { useState, useEffect } from "react";

export function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        console.log(url);
        const data = await response.json();
        let reverseItems;
        Array.isArray(data)
          ? (reverseItems = data.reverse())
          : (reverseItems = data);
        console.log(reverseItems);
        setData(reverseItems);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        // setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
