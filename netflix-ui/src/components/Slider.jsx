import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({ movies, onCurrent }) {
  const getMoviesFromRange = (from, to) => {
    if (movies === undefined) {
      return [];
    } else {
      return movies.slice(from, to);
    }
  };
  return (
    <div>
      <CardSlider
        title="Trending Now"
        data={getMoviesFromRange(0, 10)}
        onCurrent={onCurrent}
      />
      <CardSlider
        title="New Relases"
        data={getMoviesFromRange(10, 20)}
        onCurrent={onCurrent}
      />
      <CardSlider
        title="Recommended"
        data={getMoviesFromRange(20, 30)}
        onCurrent={onCurrent}
      />
      <CardSlider
        title="Popular"
        data={getMoviesFromRange(30, 40)}
        onCurrent={onCurrent}
      />
      <CardSlider
        title="Only on Netfloo"
        data={getMoviesFromRange(40, 50)}
        onCurrent={onCurrent}
      />
      <CardSlider
        title="Bingeworthy"
        data={getMoviesFromRange(50, 60)}
        onCurrent={onCurrent}
      />
    </div>
  );
});
