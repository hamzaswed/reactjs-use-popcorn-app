/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "../UI/StarRating";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

const KEY = "23f80004";

export default function MovieDetails({ movieId, onCloseSelectedMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  let {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

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
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

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
              <StarRating shwoRatingResult size={24} maxRating={10} />
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
