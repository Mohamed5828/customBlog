import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/css/components/allItem.css";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import URL from "../tools/config";
import { useDataFetching } from "../tools/DataFetching";

function SearchResults() {
  const { title } = useParams();
  console.log(title);

  const { data, loading, error } = useDataFetching(
    URL + `/postsearch/${title}`
  );

  if (!loading) {
    if (data.length == 0) {
      return <NotFound />;
    } else {
      return (
        <div className="allItems-container">
          {data.map((item) => {
            return (
              <div className="post-item ">
                <div className="main-padding">
                  <img
                    className="all-img"
                    src={
                      item.imgs != ""
                        ? item.imgs
                        : "https://firebasestorage.googleapis.com/v0/b/blogimgupload-3998a.appspot.com/o/nothumb.jpg?alt=media&token=39ca3696-b50c-444f-b3e1-786b4cb0533b"
                    }
                  />
                  <Link to={`/post/${item._id}`}>
                    <div className="all-description">
                      <h1 className="item-title">{item.title}</h1>
                      <p className="item-desc">{item.description}</p>
                    </div>
                  </Link>
                </div>
                <div className="allpg-btn">
                  <form
                    action={`/delete/${item._id}?_method=DELETE`}
                    method="POST"
                    className="form-delete
              "
                  >
                    <button className="delete-btn sliding">delete</button>
                  </form>
                  <Link
                    to={`/updatepost/${item._id}`}
                    className="form-edit
              "
                  >
                    <button className="delete-btn pulse">Edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default SearchResults;
