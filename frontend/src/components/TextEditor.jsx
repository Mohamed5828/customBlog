import React, { useCallback, useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import URL from "../config";
import "../Styling/css/components/editor.css";

//font config
const Font = Quill.import("formats/font");
Font.whitelist = ["Sans Serif", "Courier", "Impact", "Raleway", "monospace"];
Quill.register(Font, true);

export default function TextEditor({ setPostData, postData }) {
  const [quill, setQuill] = useState();
  const { id } = useParams();
  const inputFile = useRef(null);
  const [imgURL, setImgURL] = useState([]);

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

  const TOOLBAR_OPTIONS = {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        {
          font: Font.whitelist,
        },
      ],
      [{ size: ["small", "normal", "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ blockquote: "blockquote" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  };

  function imageHandler() {
    inputFile.current.click();
  }
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

      axios
        .post(URL + `/uploadimg/${id}`, formData, config)
        .then((response) => {
          if (response.data.success) {
            quill.focus();
            let range = quill.getSelection();
            let position = range ? range.index : 0;

            // Go to the image blot and create an image, take the src and alt from the footer, and put it in the editorHTML.
            quill.insertEmbed(position, "image", {
              src: response.data.downloadURL,
              alt: response.data.name,
            });
            quill.setSelection(position + 1);
            setImgURL((prevURLs) => {
              return [...prevURLs, response.data.downloadURL];
            });
          } else {
            return alert("failed to upload file");
          }
        });
    }
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
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
      <input type="hidden" name="imgsURL" value={imgURL} />
    </>
  );
}
