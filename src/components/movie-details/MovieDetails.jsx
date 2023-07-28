/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "../UI/StarRating";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

const KEY = "23f80004";

export default function MovieDetails({
  movieId,
  onCloseSelectedMovie,
  onAddWatchedMovie,
  watchedMovieList,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userRating, setUserRating] = useState(0);

  /**
   ** get movie details if the movie watched before
   */

  const isWatched = watchedMovieList.some((movie) => movie.imdbID === movieId);
  const watchedUserRating = watchedMovieList.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  let {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const clickHandler = function () {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating,
      userRating,
      runtime: parseInt(runtime),
    };

    onAddWatchedMovie(newWatchedMovie);
  };

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        setError(false);

        const response = await axios("http://www.omdbapi.com/", {
          params: {
            apikey: KEY,
            i: movieId,
          },
        });

        if (response.data.Error) {
          throw new Error(response.data.Error);
        }

        setMovie(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    document.title = title ? `Movie | ${title}` : "usePopcorn";

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    function onEscKeyClick(e) {
      if (e.key === "Escape") {
        onCloseSelectedMovie();
      }
    }

    document.addEventListener("keydown", onEscKeyClick);

    return () => {
      document.removeEventListener("keydown", onEscKeyClick);
    };
  }, [onCloseSelectedMovie]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelectedMovie}>
              &larr;
            </button>

            <img
              src={poster}
              alt={`Poster of ${title} movie`}
              onError={function (img) {
                img.target.src = "https://fakeimg.pl/200x300/eee/909090?text=‎";
              }}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    shwoRatingResult
                    size={24}
                    maxRating={10}
                    onRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={clickHandler}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="userrating-message">
                  You rated this movie with ({" "}
                  <span>{watchedUserRating} ⭐️</span> )
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
