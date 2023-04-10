import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/components/allItem.css";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import URL from "../config";

function SearchResults() {
  useEffect(() => {
    fetchItems();
  }, []);
  const { title } = useParams();
  console.log(title);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(URL + `/postsearch/${title}`);
    const items = await data.json();
    setItemData(items);
  }

  if (itemData.length == 0) {
    return <NotFound />;
  } else {
    return (
      <div className="allItems-container">
        {itemData.map((item) => {
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
                <Link to={URL + `/post/${item._id}`}>
                  <div className="all-description">
                    <h1 className="item-title">{item.title}</h1>
                    <p className="item-desc">{item.description}</p>
                  </div>
                </Link>
              </div>
              <div className="allpg-btn">
                <form
                  action={URL + `/delete/${item._id}?_method=DELETE`}
                  method="POST"
                  className="form-delete
              "
                >
                  <button className="delete-btn sliding">delete</button>
                </form>
                <Link
                  to={URL + `/updatepost/${item._id}`}
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

export default SearchResults;
