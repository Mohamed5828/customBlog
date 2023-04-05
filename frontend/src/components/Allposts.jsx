import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/components/allItem.css";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function Allposts() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(`/posts/post`);
    const items = await data.json();
    setItemData(items);
  }
  if (itemData.length == 0) {
    return (
      <div className="write-container">
        <div className="post-submitted-card">
          <div className="submit-details">
            <h2 className="submit-done">
              you dont have any post written at the moment maybe consider
              <Link to={`/documents/${uuidV4()}`}> writting one</Link>
            </h2>
          </div>
        </div>
      </div>
    );
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
                <Link to={`/post/${item._id}`}>
                  <div className="all-description">
                    <h1 className="item-title">{item.title}</h1>
                    <p className="item-desc">{item.description}</p>
                  </div>
                </Link>
              </div>
              <div className="allpg-btn">
                <form
                  action={`/delete/post/${item._id}?_method=DELETE`}
                  method="POST"
                  className="form-delete
              "
                >
                  <button className="delete-btn sliding">delete</button>
                </form>
                <Link to={`/updatetype/post/${item._id}`} className="form-edit">
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
export default Allposts;
