import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Bar = styled.div`
  margin-top: 63px;
  position: fixed;
  height: 6px;
  border-radius: 0px 2px 0px 0px;
  background: linear-gradient(
    90deg,
    rgba(109, 227, 219, 1) 0%,
    rgba(132, 115, 177, 1) 100%,
    rgba(3, 9, 112, 1) 100%
  );
`;
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  }, []);

  function scrollHeight() {
    const docEl = document.documentElement;
    const ScrollTop = docEl.scrollTop || document.body.scrollTop;
    const ScrollHeight = docEl.scrollHeight || document.body.scrollHeight;
    const percentage = (ScrollTop / (ScrollHeight - docEl.clientHeight)) * 100;
    setWidth(percentage);
  }
  return (
    <>
      <Bar style={{ width: width + "%" }}></Bar>
    </>
  );
}

export default ProgressBar;
