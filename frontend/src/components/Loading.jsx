import React, { useState } from "react";

function Loading(show) {
  const [loadingText, setLoadingText] = useState(false);
  console.log(show.show);
  setTimeout(() => {
    setLoadingText(true);
  }, 7000);

  return (
    <div className={show.show ? "loader" : "loader--hidden"}>
      {loadingText && show.show && (
        <h2 className="loading-text">
          If loading takes so much consider refreshing the page or go to another
          page the deployed server is a bit slow
        </h2>
      )}
    </div>
  );
}

export default Loading;
