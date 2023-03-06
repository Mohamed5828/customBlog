import React from "react";
import FormHandler from "./components/FormHandler";
import HomePage from "./HomePage";
import DisplayPost from "./components/DisplayPost";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allposts from "./components/Allposts";
import DraftPost from "./components/DraftPost";

function App() {
  console.log("hi");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/allposts" element={<Allposts />} />
        <Route path="/drafts" element={<DraftPost />} />
        <Route path="/documents/:id" element={<FormHandler />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<DisplayPost />} />
      </Routes>
    </Router>
  );
}

export default App;
