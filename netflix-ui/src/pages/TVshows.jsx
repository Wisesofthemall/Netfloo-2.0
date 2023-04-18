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

export default function TVshows() {
  const [isScrolled, setIsScrolled] = useState(false);
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
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="tv" />

        {movies ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}
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
