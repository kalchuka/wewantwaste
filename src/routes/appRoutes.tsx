import { Route, Routes } from "react-router-dom";
import SkipSize from "../modules/skipSize/screens/skip_size_screen";
import React from "react";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SkipSize/>} />
    </Routes>
  );
}