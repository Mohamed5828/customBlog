import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styling/css/components/blogPost.css";
import URL from "../config";

function DisplayDraft() {
  useEffect(() => {
    fetchItems();
  }, []);
  const { id } = useParams();
  console.log(id);

  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(URL + `/draft/${id}`);
    const items = await data.json();
    setItemData(items);
  }

  function innerHtml() {
    // itemData.map((item) => {
    // console.log(itemData[0].posts);
    return { __html: itemData.drafts };
    // });
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <div dangerouslySetInnerHTML={innerHtml()}></div>
      </div>
    </div>
  );
}

export default DisplayDraft;
