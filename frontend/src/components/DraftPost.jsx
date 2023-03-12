import React, { useEffect } from "react";
import { useState } from "react";

function DraftPost() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(`/drafts`);
    const items = await data.json();
    setItemData(items);
  }
  return (
    <div className="allItems-container">
      {itemData.map((item) => {
        return (
          <div className="post-item">
            <div className="main-padding">
              <img
                className="all-img"
                src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <div className="all-description">
                <h1 className="item-title">{item.title}</h1>
                <p className="item-desc">{item.description}</p>
              </div>
              <form
                action={`/deletedraft/${item._id}?_method=DELETE`}
                method="POST"
              >
                <button className="delete-btn">delete</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DraftPost;
