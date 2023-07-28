import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";

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
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const selectMovieHandler = function (id) {
    if (id === selectedMovie) {
      closeSelectedMovieHandler();
      return;
    }

    setSelectedMovie(id);
  };

  const closeSelectedMovieHandler = function () {
    setSelectedMovie(null);
  };

  const addWatchedMovieHandler = function (movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedMovie(null);
  };

  const deleteWatchedMovieHandler = function (id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const { movies, isLoading, error } = useMovies(query);

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
