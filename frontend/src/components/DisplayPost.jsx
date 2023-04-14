import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styling/css/components/blogPost.css";
import NotFound from "./NotFound";
import URL from "../config";

function DisplayPost() {
  useEffect(() => {
    fetchItems();
  }, []);
  const { id } = useParams();
  console.log(id);

  const [itemData, setItemData] = useState([]);
  async function fetchItems() {
    const data = await fetch(URL + `/post/${id}`);
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
          {itemData.updated_at && (
            <div className="time">
              Post at: {itemData.updated_at.slice(0, 10)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default DisplayPost;
