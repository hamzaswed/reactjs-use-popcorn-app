import { useEffect, useState } from "react";

// Third-Party Libraries
import axios from "axios";

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

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "23f80004";

let theFunctionWillRun;
function runAfterTime(fun, time = 500) {
  clearTimeout(theFunctionWillRun);
  theFunctionWillRun = setTimeout(() => {
    fun();
  }, time);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const response = await axios("http://www.omdbapi.com/", {
          params: {
            apikey: KEY,
            s: query,
          },
        });

        if (response.data.Error) {
          throw new Error(response.data.Error);
        }

        setMovies(response.data.Search);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length) {
      runAfterTime(fetchData, 500);
    } else {
      setMovies([]);
      setError(false);
    }
  }, [query]);

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
              <WatchedMoviesList watchedMovies={watched} />
            </>
          )}
        </WatchedMoviesBox>
      </main>
    </>
  );
}
