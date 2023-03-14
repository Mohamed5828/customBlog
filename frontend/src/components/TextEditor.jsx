import React, { useCallback, useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

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
    handlers: {
      image: imageHandler,
    },
  };

  const inputFile = useRef(null);
  const reactQuillRef = useRef(null);

  // const handleChange = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   console.log(fileUploaded);
  // };
  function imageHandler() {
    inputFile.current.click();
  }
  const [quill, setQuill] = useState();
  const BlockEmbed = Quill.import("blots/block/embed");

  class ImageBlot extends BlockEmbed {
    static create(value) {
      const imgTag = super.create();
      imgTag.setAttribute("src", value.src);
      imgTag.setAttribute("alt", value.alt);
      imgTag.setAttribute("width", "100%");
      return imgTag;
    }

    static value(node) {
      return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
    }
  }

  ImageBlot.blotName = "image";
  ImageBlot.tagName = "img";
  Quill.register(ImageBlot);

  function insertImage(e) {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios.post("/uploadimg", formData, config).then((response) => {
        if (response.data.success) {
          quill.focus();

          let range = quill.getSelection();
          let position = range ? range.index : 0;

          //First put the image in the node server and then put it in the src below here
          // Go to the image blot and create an image, take the src and alt from the footer, and put it in the editorHTML.
          quill.insertEmbed(position, "image", {
            src: "http://localhost:3000/" + response.data.url,
            alt: response.data.fileName,
          });
          quill.setSelection(position + 1);

          // setImgFiles((prevFiles) => {
          //   return [...prevFiles, file];
          // });
        } else {
          return alert("failed to upload file");
        }
      });
    }
  }
  useEffect(() => {
    if (quill == null) return;
    if (postData == null) {
      quill.root.innerHTML = "";
      return;
    }
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

      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={insertImage}
        accept="image/*"
      />
    </>
  );
}
