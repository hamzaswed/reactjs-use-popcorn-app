/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function SearchInput({ query, setQuery }) {
  const inputEl = useRef();
  useKey(function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }, "Enter");

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
