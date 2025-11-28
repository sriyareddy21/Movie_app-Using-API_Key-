import React, { useEffect, useState } from "react";
import _ from "lodash";

import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch Movies
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=78d890ba82618aa515b3c9f885563c22`
    );
    const data = await response.json();

    setMovies(data.results);
    setFiltered(data.results);

    // Extract unique languages
    const langs = [...new Set(data.results.map((m) => m.original_language))];
    setLanguages(langs);
  };

  // Apply all filters
  useEffect(() => {
    let result = [...movies];

    // Language filter
    if (selectedLanguage !== "all") {
      result = result.filter((m) => m.original_language === selectedLanguage);
    }

    // Search filter
    if (search.trim() !== "") {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sort.by !== "default") {
      result = _.orderBy(result, [sort.by], [sort.order]);
    }

    setFiltered(result);
  }, [movies, selectedLanguage, search, sort]);

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Movies..."
            className="movie_search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Sort Dropdown */}
          <select
            name="by"
            onChange={(e) =>
              setSort((prev) => ({ ...prev, by: e.target.value }))
            }
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>

            {/* Hide rating sort only for upcoming */}
            {type !== "upcoming" && (
              <option value="vote_average">Rating</option>
            )}
          </select>

          <select
            name="order"
            onChange={(e) =>
              setSort((prev) => ({ ...prev, order: e.target.value }))
            }
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          {/* Language filter */}
          <select
            className="movie_sorting"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Movie Cards */}
      <div className="movie_cards">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
