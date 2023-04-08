import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styling/components/blogPost.css";
import NotFound from "./NotFound";

function DisplayPost() {
  useEffect(() => {
    fetchItems();
  }, []);
  const { id } = useParams();
  console.log(id);

  const [itemData, setItemData] = useState([]);
  async function fetchItems() {
    const data = await fetch(`/post/${id}`);
    const items = await data.json();
    setItemData(items);
  }
  console.log(itemData);

  function innerHtml() {
    return { __html: itemData.posts };
  }
  if (itemData.length == 0) {
    return <NotFound />;
  } else {
    return (
      <div className="post-container">
        <div className="post-content">
          <div className="post-title">{itemData.title}</div>
          <div dangerouslySetInnerHTML={innerHtml()}></div>
        </div>
      </div>
    );
  }
}
export default DisplayPost;
