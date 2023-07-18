/* eslint-disable react/prop-types */
import WatchedMoviesListItem from "./WatchedMoviesListItem";

export default function WatchedMoviesList({ watchedMovies }) {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMoviesListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
