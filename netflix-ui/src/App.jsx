import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Netfloo from "./pages/Netfloo";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Netfloo />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}
