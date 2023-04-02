import React from "react";
import FormHandler from "./components/FormHandler";
import HomePage from "./HomePage";
import DisplayPost from "./components/DisplayPost";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allposts from "./components/Allposts";
import DraftPost from "./components/DraftPost";
import PostSubmitted from "./components/PostSubmitted";
import EditPost from "./components/EditPost";
import ProgressBar from "./components/ProgressBar";
import SearchResults from "./components/SearchResults";
import EditDraft from "./components/EditDraft";
import DisplayDraft from "./components/DrisplayDraft";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/allposts" element={<Allposts />} />
        <Route path="/postsearch/:title" element={<SearchResults />} />
        <Route path="/drafts" element={<DraftPost />} />
        <Route path="/documents/:id" element={<FormHandler />} />
        <Route path="/update/:id" element={<FormHandler />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/post/:id"
          element={
            <>
              <ProgressBar />
              <DisplayPost />
            </>
          }
        />
        <Route
          path="/draft/:id"
          element={
            <>
              <ProgressBar />
              <DisplayDraft />
            </>
          }
        />
        <Route path="/updatepost/:id" element={<EditPost />} />
        <Route path="/updatedraft/:id" element={<EditDraft />} />
        <Route path="/postsubmitted" element={<PostSubmitted />} />
      </Routes>
    </Router>
  );
}

export default App;
