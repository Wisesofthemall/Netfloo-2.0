import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:4000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              onClick={() => {
                navigate("/player");
              }}
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
            />
            <video src={video} autoPlay loop muted />
            <h3
              onClick={() => {
                navigate("/player");
              }}
              className="name"
            >
              {movieData.name}
            </h3>
            <div className="info-container flex column">
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    onClick={() => {
                      navigate("/player");
                    }}
                    title="play"
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck
                      onClick={() => {
                        dispatch(
                          removeMovieFromLiked({
                            movieId: movieData.id,
                            email,
                          }),
                        );
                      }}
                      title="Remove From List"
                    />
                  ) : (
                    <AiOutlinePlus
                      onClick={() => {
                        addToList();
                      }}
                      title="Add to my list "
                    />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => {
                    return (
                      <ul className="genre" key={`${genre}`}>
                        {genre}
                      </ul>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});
const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {

      position: relative;
      height: 200px;

      h3 {
        padding: 0.5rem;
        position: absolute;
        z-index: 5;
    }
      }
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;

      }
      .info-container {
        top: 7rem;
        position: absolute;
        z-index: 5;
        padding: 1rem;
        gap: 0.5rem;
      }
      .icons {
        .controls {
          display: flex;
          gap: 1rem;
        }
        svg {
          font-size: 2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }

        }

      }
      .genre {
        margin-right: 1vw;
      }
    }
  }
`;
