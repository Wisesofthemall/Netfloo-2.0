import React, { useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default React.memo(function Player({ current }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("the current", current);
  }, [current]);
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        {current ? (
          <iframe
            title={"movieData.name"}
            src={`https://www.youtube.com/embed/${current}?autoplay=1`}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : null}
      </div>
    </Container>
  );
});
const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
