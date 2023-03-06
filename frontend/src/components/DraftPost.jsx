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
    <div className="post-container">
      {itemData.map((item) => {
        return (
          <div>
            <h1 className="card-title">{item.title}</h1>
            <p className="card-desc">{item.drafts}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DraftPost;
