import React, { useState } from "react";
import { Link } from "react-router-dom";
import URL from "../tools/config";

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  function handleChange(event) {
    setSearchWord((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
    console.log(searchWord.search);
  }
  return (
    <div>
      <input
        type={"text"}
        value={searchWord.search}
        onChange={handleChange}
        name="search"
        className="search-bar"
      />
      <Link
        to={`/postsearch/${searchWord.search}`}
        onClick={() =>
          (window.location.href = `/postsearch/${searchWord.search}`)
        }
      >
        <button className="search-btn">Search</button>
      </Link>
    </div>
  );
}

export default SearchBar;
