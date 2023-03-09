import React, { useEffect } from "react";
import { useState } from "react";
import "../Styling/components/allItem.css";
import { BsTrash } from "react-icons/fa";
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
              <div className="all-description">
                <h1 className="card-title">{item.title}</h1>
                <p className="card-desc">{item.description}</p>
              </div>
            </div>
            <div className="allpg-btn">
              <form
                action={`/delete/${item._id}?_method=DELETE`}
                method="POST"
                className="form-delete
              "
              >
                <button className="delete-btn">delete</button>
              </form>
              <form
                action={`/delete/${item._id}?_method=DELETE`}
                method="POST"
                className="form-edit
              "
              >
                <button className="delete-btn">Edit</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Allposts;
