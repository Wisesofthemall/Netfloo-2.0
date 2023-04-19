import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import styled from "styled-components";
import { BiNoEntry } from "react-icons/bi";
export default React.memo(function SearchResults({
  movies,
  query,
  setCurrent,
}) {
  const [filter, setFilter] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${420 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-360 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  useEffect(() => {
    const fill = movies.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

    setFilter(fill);
  }, [query, movies]);
  return (
    <Container
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
      }}
      className="flex column"
    >
      <h1>Search Results for {`${query}`}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {filter.length != 0 ? (
            filter.map((movie, index) => {
              return (
                <Card
                  setCurrent={setCurrent}
                  key={`${index} ${movie.id}`}
                  movieData={movie}
                  index={index}
                />
              );
            })
          ) : (
            <div className="text">NO Results Found</div>
          )}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .text {
      font-size: 5rem;
      position: absolute;
      display: contents;
    }
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
