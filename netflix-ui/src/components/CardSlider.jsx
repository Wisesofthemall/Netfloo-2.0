import React from "react";
import Card from "./Card";

export default function CardSlider({ data, title }) {
  return (
    <div className="flex">
      {data.map((movie, index) => {
        return (
          <Card key={`${index} ${movie.id}`} movieData={movie} index={index} />
        );
      })}
    </div>
  );
}
