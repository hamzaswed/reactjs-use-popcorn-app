/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function SearchInput({ query, setQuery }) {
  const inputEl = useRef();

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Movies..."
      ref={inputEl}
    />
  );
}
