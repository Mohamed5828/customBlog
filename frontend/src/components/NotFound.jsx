import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="write-container">
      <div className="post-submitted-card">
        <div className="submit-details">
          <h2 className="submit-done">
            The Content you are trying to reach is not available try something
            else or go to the
            <Link to={`/`}> Homepage</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
