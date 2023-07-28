import { useCallback, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalstorage } from "./hooks/useLocalstorage";
import { useKey } from "./hooks/useKey";

// Components
import Header from "./components/layout/Header";
import SearchInput from "./components/UI/SearchInput";
import FoundResults from "./components/layout/FoundResults";
import MoviesBox from "./components/movies/MoviesBox";
import MoviesList from "./components/movies/MoviesList";
import WatchedMoviesBox from "./components/watched-movies/WatchedMoviesBox";
import WatchedMoviesList from "./components/watched-movies/WatchedMoviesList";
import WatchedMoviesSummary from "./components/watched-movies/WatchedMoviesSummary";
import MovieDetails from "./components/movie-details/MovieDetails";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/UI/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [watched, setWatched] = useLocalstorage("watched", []);

  const selectMovieHandler = function (id) {
    if (id === selectedMovie) {
      closeSelectedMovieHandler();
      return;
    }

    setSelectedMovie(id);
  };

  const closeSelectedMovieHandler = useCallback(function () {
    setSelectedMovie(null);
  }, []);

  const addWatchedMovieHandler = function (movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedMovie(null);
  };

  const deleteWatchedMovieHandler = function (id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  const { movies, isLoading, error } = useMovies(
    query,
    closeSelectedMovieHandler
  );
  useKey(closeSelectedMovieHandler, "Escape");

  return (
    <>
      <Header>
        <SearchInput query={query} setQuery={setQuery} />
        <FoundResults movies={movies} />
      </Header>

      <main className="main">
        <MoviesBox>
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              onSelectMovie={selectMovieHandler}
              selectedMovie={selectedMovie}
            />
          )}

          {isLoading && <Loader />}

          {error && <ErrorMessage message={error.message} />}
        </MoviesBox>

        <WatchedMoviesBox>
          {selectedMovie ? (
            <MovieDetails
              movieId={selectedMovie}
              key={selectedMovie}
              onCloseSelectedMovie={closeSelectedMovieHandler}
              onAddWatchedMovie={addWatchedMovieHandler}
              watchedMovieList={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watchedMovies={watched} />
              <WatchedMoviesList
                watchedMovies={watched}
                onDeleteWatchedMovie={deleteWatchedMovieHandler}
              />
            </>
          )}
        </WatchedMoviesBox>
      </main>
    </>
  );
}
