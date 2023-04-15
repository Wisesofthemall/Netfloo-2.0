import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netfloo.movies);
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
      dispatch(fetchMovies({ type: "movies" }));
    }
  }, [dispatch, genresLoaded]);
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
    </Container>
  );
}
const Container = styled.div`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
