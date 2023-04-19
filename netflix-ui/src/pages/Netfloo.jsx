import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider.jsx";
import axios from "axios";
import SearchResults from "../components/SearchResults";
export default React.memo(function Netfloo({ setCurrent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [feature, setFeature] = useState(null);
  const [query, setQuery] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netfloo.movies);
  const genresLoaded = useSelector((state) => state.netfloo.genresLoaded);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => window.onscroll == null;
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [dispatch, genresLoaded]);

  useEffect(() => {
    if (query === null || query === "") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [query]);

  const getAllYTLink = async () => {
    const data = await axios.get("http://localhost:4000/api/user/video/all", {
      params: {},
    });

    const Array = data.data.movies;
    const videoOfChose = Array[Math.floor(Math.random() * Array.length)];
    setFeature(videoOfChose);
  };
  useEffect(() => {
    getAllYTLink();
  }, []);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} setQuery={setQuery} />
      <div className="hero">
        {feature ? (
          <iframe
            title={feature.movieId}
            src={`https://www.youtube.com/embed/${feature.link}?controls=0&autoplay=1&modestbranding=1&rel=0&loop=1`}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : null}
        <div className="container">
          <div className="logo">
            {feature ? (
              <div className="text">
                {feature.name}
                <img src={logo} alt="" />
              </div>
            ) : null}
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => {
                navigate("/player");
              }}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      {!showResults ? (
        <Slider movies={movies} setCurrent={setCurrent} />
      ) : (
        <SearchResults movies={movies} query={query} setCurrent={setCurrent} />
      )}
    </Container>
  );
});
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }

    iframe {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        .text {
          width: 60%;
          height: 100%;
          margin-left: 5rem;
          font-size: 4rem;
          img {
            margin-bottom: -0.5rem;
            width: 4rem;
            height: 4rem;
          }
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &: hover {
            opacity: 0.8;
          }
          &: nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
