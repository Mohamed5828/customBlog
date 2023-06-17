import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/css/components/allItem.css";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import URL from "../config";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Allposts() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([]);
  async function fetchItems() {
    const data = await fetch(URL + `/posts/post`);
    const itemReverse = await data.json();
    const items = itemReverse.reverse();
    setItemData(items);
  }
  console.log(URL);
  if (itemData.length == 0) {
    setTimeout(() => {
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
    }, 2000);
  } else {
    return (
      <div className="allItems-container">
        {itemData.map((item) => {
          return (
            <div className="post-item ">
              <div className="main-padding">
                <LazyLoadImage
                  className="all-img"
                  src={
                    item.imgs != ""
                      ? item.imgs
                      : "https://firebasestorage.googleapis.com/v0/b/blogimgupload-3998a.appspot.com/o/nothumb.jpg?alt=media&token=39ca3696-b50c-444f-b3e1-786b4cb0533b"
                  }
                />

                <Link to={`/post/${item._id}`}>
                  <div className="all-description">
                    <h1 className="item-title">
                      {item.title.slice(0, 25) +
                        (item.title.length > 25 ? "..." : "")}
                    </h1>
                    <p className="item-desc">
                      {item.description.slice(0, 120) +
                        (item.description.length > 120 ? "..." : "")}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="allpg-btn">
                <form
                  action={URL + `/delete/post/${item._id}?_method=DELETE`}
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
