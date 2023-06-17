import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styling/css/components/blogPost.css";
import URL from "../tools/config";
import { useDataFetching } from "../tools/DataFetching";

function DisplayDraft() {
  const { id } = useParams();
  console.log(id);

  const { data, loading, error } = useDataFetching(URL + `/draft/${id}`);

  function innerHtml() {
    // itemData.map((item) => {
    // console.log(itemData[0].posts);
    return { __html: data.drafts };
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
