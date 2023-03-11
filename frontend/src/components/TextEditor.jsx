import React, { useCallback, useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor({ setPostData, postData }) {
  const TOOLBAR_OPTIONS = {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
    // handlers: {
    //   image: imageHandler,
    // },
  };
  // const [file, setFile] = useState([]);
  // const inputFile = useRef(null);

  // e.stopPropagation();
  // e.preventDefault();
  // this.setFile({ file });
  // setFile = event.target.files[0]
  // const handleChange = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   console.log(fileUploaded);
  // };
  // function imageHandler(e) {
  //   inputFile.current.click();
  // }
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;
    if (quill.root.innerHTML === postData) return;
    quill.root.innerHTML = postData;
  }, [quill, postData]);

  useEffect(() => {
    if (quill == null) return;
    quill.on("text-change", (delta, oldDelta, source) => {
      setPostData(quill.root.innerHTML);
    });
  }, [quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
      placeholder: "Lets Type",
    });
    setQuill(q);
  }, []);

  return (
    <>
      <div id="container" ref={wrapperRef}></div>
      {/* <form method="POST" action={"/uploadimg"}>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </form> */}
    </>
  );
}
