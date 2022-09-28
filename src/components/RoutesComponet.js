import React from "react";

import { Route, Routes, Redirect } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
import Search from "./Search";

export default function RoutesComponet() {
  return (
    <>
      <Search />
      <Routes>
        <Route exect path="/" element={<Home />}></Route>
        <Route exect path="/search" element={<Results />} />
        <Route path="/image" element={<Results />} />
        <Route path="/news" element={<Results />} />
        <Route path="/video" element={<Results />} />
      </Routes>
    </>
  );
}
