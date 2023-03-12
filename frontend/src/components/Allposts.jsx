import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/components/allItem.css";
import { Link } from "react-router-dom";
function Allposts() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(`/posts`);
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
                src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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

export default Allposts;
