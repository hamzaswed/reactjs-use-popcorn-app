/* eslint-disable react/prop-types */
export default function WatchedMoviesListItem({ movie }) {
  return (
    <li>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        onError={function (img) {
          img.target.src = "https://fakeimg.pl/200x300/eee/909090?text=‎";
        }}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
