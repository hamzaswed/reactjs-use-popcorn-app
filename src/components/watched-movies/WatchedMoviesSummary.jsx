/* eslint-disable react/prop-types */

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedMoviesSummary({ watchedMovies }) {
  const avgImdbRating = average(
    watchedMovies.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watchedMovies.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(
    watchedMovies.map((movie) => movie.runtime)
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
