import React from "react";
import "./MovieCard.css";
import Star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback.png";

  const title = movie.original_title || movie.title || "Untitled";
  const description =
    movie.overview?.slice(0, 100) ?? "No description available";

  return (
    <a
      href={`https://www.themoviedb.org/movie/${movie.id}`}
      target="_blank"
      rel="noreferrer"
      className="movie_card"
    >
      <img src={poster} alt={title} className="movie_poster" />

      <div className="movie_details">
        <h3 className="movie_details_heading">{title}</h3>

        <div className="align_center movie_date_rate">
          <p>{movie.release_date}</p>

          <p className="align_center">
            {movie.vote_average}
            <img src={Star} alt="rating icon" className="card_emoji" />
          </p>
        </div>

        <p className="movie_description">{description}...</p>
      </div>
    </a>
  );
};

export default MovieCard;
