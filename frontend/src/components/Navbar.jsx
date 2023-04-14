import React, { useState } from "react";
import "../Styling/css/components/navbar.css";
import { v4 as uuidV4 } from "uuid";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  const [sideMenu, setSideMenu] = useState(false);
  function toggleSideMenu() {
    setSideMenu((prevState) => (prevState = !prevState));
  }

  return (
    <>
      <header className="navbar">
        <h1 className="site-title">BLOG</h1>
        <SearchBar />
        <nav>
          <ul className="navbar-links">
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
              <Link to={"drafts"}>Search</Link>
            </li>
            <li>
              <Link to={`documents/${uuidV4()}`}>Write a Post</Link>
            </li>
          </ul>
          <button className="navbar-menu" onClick={toggleSideMenu}>
            Menu
          </button>
        </nav>
      </header>
      {sideMenu && (
        <div className="sidebar">
          <button>close</button>
          <div className="sidebar-content">
            <div className="side-search">
              <h4>Search for a post by title:</h4>
              <SearchBar />
            </div>
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
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
