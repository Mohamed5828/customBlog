import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/components/allItem.css";
import { Link, useParams } from "react-router-dom";

function SearchResults() {
  useEffect(() => {
    fetchItems();
  }, []);
  const { title } = useParams();
  console.log(title);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(`/postsearch/${title}`);
    const items = await data.json();
    setItemData(items);
  }

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
              <Link to={`http://localhost:3000/post/${item._id}`}>
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

export default SearchResults;
