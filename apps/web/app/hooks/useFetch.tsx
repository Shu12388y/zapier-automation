"use client";
import { useState, useEffect } from "react";

function useFetch(url: string | null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Don't fetch if URL is null
    if (!url) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const intervalId: NodeJS.Timeout = setInterval(fetchData, 6000);

    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url as string);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Only update state if component is still mounted
        if (isMounted) {
          // Handle different API response structures
          setData(result.data !== undefined ? result.data : result);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }

    // Fetch data immediately on mount
    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [url]); // Re-run effect when URL changes

  return { data, error, loading };
}

export default useFetch;
