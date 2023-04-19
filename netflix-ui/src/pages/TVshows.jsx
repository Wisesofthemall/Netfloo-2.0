import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider.jsx";
import NotAvailable from "../components/NotAvailable.jsx";
import SelectGenre from "../components/SelectGenre";
import SearchResults from "../components/SearchResults";

export default React.memo(function TVshows({ setCurrent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netfloo.movies);
  const genres = useSelector((state) => state.netfloo.genres);
  const genresLoaded = useSelector((state) => state.netfloo.genresLoaded);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => window.onscroll == null;
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      // navigate("/");
    }
  });
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [dispatch, genresLoaded]);
  useEffect(() => {
    if (query === null || query === "") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [query]);
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} setQuery={setQuery} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="tv" />

        {!showResults ? (
          <div className="">
            {movies ? <Slider movies={movies} /> : <NotAvailable />}
          </div>
        ) : (
          <SearchResults
            movies={movies}
            query={query}
            setCurrent={setCurrent}
          />
        )}
      </div>
    </Container>
  );
});
const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
