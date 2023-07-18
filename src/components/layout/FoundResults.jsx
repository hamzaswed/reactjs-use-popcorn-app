/* eslint-disable react/prop-types */
export default function FoundResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
