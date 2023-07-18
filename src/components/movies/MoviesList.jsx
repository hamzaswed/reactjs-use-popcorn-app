/* eslint-disable react/prop-types */
import MoviesListItem from "./MoviesListItem";

export default function MoviesList({ movies, onSelectMovie, selectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies.length <= 0 ? (
        <p className="enter-message">
          Empty theater! 🎭🚫 The screen is blank, but the possibilities are
          endless. Search for movies and learn about their ratings🍿🎞️
        </p>
      ) : (
        movies?.map((movie) => (
          <MoviesListItem
            movie={movie}
            onSelectMovie={onSelectMovie}
            selectedMovie={selectedMovie}
            key={movie.imdbID}
          />
        ))
      )}
    </ul>
  );
}
