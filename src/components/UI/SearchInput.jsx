/* eslint-disable react/prop-types */

export default function SearchInput({ query, setQuery }) {
  return (
    <input
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Movies..."
    />
  );
}
