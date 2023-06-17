import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styling/css/components/blogPost.css";
import NotFound from "./NotFound";
import URL from "../tools/config";
import { useDataFetching } from "../tools/DataFetching";

function DisplayPost() {
  const { id } = useParams();
  console.log(id);

  const { data, loading, error } = useDataFetching(URL + `/post/${id}`);

  console.log(data);

  function innerHtml() {
    return { __html: data.posts };
  }
  if (loading) {
    setTimeout(() => {
      return <NotFound />;
    }, 2000);
  } else {
    return (
      <div className="post-container">
        <div className="post-content">
          <title className="post-title">{data.title}</title>
          <meta name="description" content={data.description} />
          <div dangerouslySetInnerHTML={innerHtml()}></div>
          {data.updated_at && (
            <div className="time">Post at: {data.updated_at.slice(0, 10)}</div>
          )}
        </div>
      </div>
    );
  }
}
export default DisplayPost;
