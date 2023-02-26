import React from "react";
import { useEffect, useState } from "react";

function DisplayPost() {
  const [itemData, setItemData] = useState([]);
  async function fetchItems() {
    const data = await fetch("/posts");
    const items = await data.json();
    setItemData(items);
  }
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div>
      <div>
        {itemData.map((item) => {
          return <div>{item.posts}</div>;
        })}
      </div>
    </div>
  );
}

export default DisplayPost;
