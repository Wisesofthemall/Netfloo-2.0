import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider
        title="Popular on Netfloo"
        data={getMoviesFromRange(10, 20)}
      />
      <CardSlider title="Recommended" data={getMoviesFromRange(20, 30)} />
      <CardSlider title="New Relases" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="Only on Netfloo" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Exciting Movies" data={getMoviesFromRange(50, 60)} />
    </div>
  );
});
