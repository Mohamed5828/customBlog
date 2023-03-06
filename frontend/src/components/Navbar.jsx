import React from "react";
import "../Styling/components/navbar.css";
import { v4 as uuidV4 } from "uuid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="site-title">Blog</h1>
      <nav>
        <li>
          <Link to={""}>Home</Link>
        </li>
        <li>
          <Link to={"allposts"}>All Posts</Link>
        </li>
        <li>
          <Link to={"drafts"}>Drafts</Link>
        </li>
        <li>
          <Link to={`documents/${uuidV4()}`}>Write a Post</Link>
        </li>
      </nav>
    </header>
  );
}

export default Navbar;
