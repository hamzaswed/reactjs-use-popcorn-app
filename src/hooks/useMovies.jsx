import { useState, useEffect } from "react";
import axios from "axios";

let theFunctionWillRun;
function runAfterTime(fun, time = 500) {
  clearTimeout(theFunctionWillRun);
  theFunctionWillRun = setTimeout(() => {
    fun();
  }, time);
}

// eslint-disable-next-line react-refresh/only-export-components
const KEY = "23f80004";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        callback?.();
        setIsLoading(true);
        setError(false);

        const response = await axios("http://www.omdbapi.com/", {
          params: {
            apikey: KEY,
            s: query,
          },
        });

        if (response.data.Error) {
          throw new Error(response.data.Error);
        }

        setMovies(response.data.Search);
      } catch (error) {
        // console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length) {
      runAfterTime(fetchData, 500);
    } else {
      setMovies([]);
      setError(false);
    }
  }, [query, callback]);

  return {
    movies,
    isLoading,
    error,
  };
}
