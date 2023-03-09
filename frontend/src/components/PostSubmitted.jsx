import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import "../Styling/components/postSubmitted.css";
function PostSubmitted() {
  return (
    <div className="write-container">
      <div className="post-submitted-card">
        <div className="submit-details">
          <h2 className="submit-done">your post have been submitted</h2>
          <h3 className="go-to">
            see your post in
            <Link to={"/allposts"}> All Posts page </Link>
            or if you feeling creative maybe
            <Link to={`/documents/${uuidV4()}`}> write another one</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PostSubmitted;
