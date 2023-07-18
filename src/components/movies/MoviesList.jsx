/* eslint-disable react/prop-types */
import MoviesListItem from "./MoviesListItem";

export default function MoviesList({ movies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
