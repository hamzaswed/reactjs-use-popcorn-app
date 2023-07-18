/* eslint-disable react/prop-types */
export default function MoviesListItem({
  movie,
  onSelectMovie,
  selectedMovie,
}) {
  const clickHandler = function () {
    onSelectMovie(movie.imdbID);
  };

  const componentClasses = selectedMovie === movie.imdbID ? "highlighted" : "";

  return (
    <li onClick={clickHandler} className={componentClasses}>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onError={function (img) {
          img.target.src = "https://fakeimg.pl/200x300/eee/909090?text=‎";
        }}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
