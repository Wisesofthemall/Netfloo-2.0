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
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Netfloo setCurrent={setCurrent} />} />
        <Route
          exact
          path="/movies"
          element={<Movies setCurrent={setCurrent} />}
        />
        <Route exact path="/player" element={<Player current={current} />} />
        <Route exact path="/tv" element={<TVshows setCurrent={setCurrent} />} />
        <Route
          exact
          path="/mylist"
          element={<UserLiked setCurrent={setCurrent} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
