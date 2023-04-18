import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({ movies, setCurrent }) {
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
        setCurrent={setCurrent}
      />
      <CardSlider
        title="New Relases"
        data={getMoviesFromRange(10, 20)}
        setCurrent={setCurrent}
      />
      <CardSlider
        title="Recommended"
        data={getMoviesFromRange(20, 30)}
        setCurrent={setCurrent}
      />
      <CardSlider
        title="Popular"
        data={getMoviesFromRange(30, 40)}
        setCurrent={setCurrent}
      />
      <CardSlider
        title="Only on Netfloo"
        data={getMoviesFromRange(40, 50)}
        setCurrent={setCurrent}
      />
      <CardSlider
        title="Bingeworthy"
        data={getMoviesFromRange(50, 60)}
        setCurrent={setCurrent}
      />
    </div>
  );
});
