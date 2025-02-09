import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface FetchParams {
  [key: string]: string | number;
}

export function useFetch<T>(
  baseUrl: string,
  params?: FetchParams,
  selectedField?: string
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Construct URL with query parameters
        const url = new URL(baseUrl);
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
              url.searchParams.append(key, String(value));
            }
          });
        }

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result) || result.length === 0) {
          throw new Error(
            "Invalid API response: expected an array with at least one element."
          );
        }

        let extractedData = result[0][selectedField];

        if (!extractedData) {
          throw new Error(
            `Field "${selectedField}" does not exist in API response.`
          );
        }

        // ✅ Check if extractedData is a JSON string, then parse it
        if (typeof extractedData === "string") {
          try {
            extractedData = JSON.parse(extractedData);
          } catch (jsonError) {
            console.error("JSON parsing error:", jsonError);
            throw new Error("Failed to parse JSON data.");
          }
        }

        console.log("Extracted Data:", extractedData);

        // ✅ Ensure result is always an array
        setData(Array.isArray(extractedData) ? extractedData : [extractedData]);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, params, trigger, selectedField]); // ✅ Added `selectedField` to dependencies

  const refetch = () => setTrigger((prev) => prev + 1);

  return { data, isLoading, error, refetch };
}
