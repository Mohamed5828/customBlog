import React from "react";
import CreateTopic from "./components/CreateTopic";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function App() {
  console.log("hi");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<a href={`documents/${uuidV4()}`}>Create Document</a>}
        />
        <Route path="/documents/:id" element={<CreateTopic />} />
        <Route path="/documents/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
