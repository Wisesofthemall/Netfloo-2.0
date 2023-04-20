import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Netfloo from "./pages/Netfloo";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVshows from "./pages/TVshows";
import UserLiked from "./pages/UserLiked";
export default function App() {
  const [current, setCurrent] = useState(null);

  const onCurrent = (value) => {
    setCurrent(value);
    console.log("current is", value);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Netfloo onCurrent={onCurrent} />} />
        <Route
          exact
          path="/movies"
          element={<Movies onCurrent={onCurrent} />}
        />
        <Route exact path="/player" element={<Player current={current} />} />
        <Route exact path="/tv" element={<TVshows onCurrent={onCurrent} />} />
        <Route
          exact
          path="/mylist"
          element={<UserLiked onCurrent={onCurrent} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
