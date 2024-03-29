import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import "../Styling/css/components/btn.css";
import "../Styling/css/components/writePost.css";
import URL from "../tools/config";

function FormHandler() {
  // const [files, setFiles] = useState([]);

  const [postData, setPostData] = useState("");

  const [publish, setPublish] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    postDescription: "",
    featured: false,
  });
  function handleSubmit(event) {
    if (formData.title.trim() !== "") {
      console.log("Form submitted");
    } else {
      event.preventDefault();
      alert("Cant Submit Post With No Title");
    }
  }

  // function onFilesChange(file) {
  //   setFiles((prevFiles) => {
  //     return { ...prevFiles, file };
  //   });
  //   // console.log(files);
  // }
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    console.log(formData);
    // console.log(postData);
  }

  return (
    <div className="write-container ">
      <form
        method="POST"
        action={publish === true ? URL + "/addpost" : URL + "/adddraft"}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="postInput" value={postData} />
        <input type="hidden" name="titleInput" value={formData.title} />
        <input
          type="hidden"
          name="description"
          value={formData.postDescription}
        />
        <div className="inputs">
          <div className="title">
            <label htmlFor="title" className="title-label">
              Post Title:
            </label>
            <input
              className="title-input"
              type="text"
              placeholder="Enter Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="postDescription" className="description-label">
            Post Description:
          </label>
          <input
            className="description-input"
            type="text"
            placeholder="Enter description for the post"
            name="postDescription"
            value={formData.postDescription}
            onChange={handleChange}
          />
          <label htmlFor="featured">featured </label>
          <input
            type="checkbox"
            name="featured"
            value={formData.featured}
            onChange={handleChange}
          />
          <div className="editor">
            <TextEditor
              setPostData={setPostData}
              postData={postData}
              // onFilesChange={onFilesChange}
            />
          </div>
        </div>
        <div className="form-btns">
          <input
            className="submit-btn"
            type="submit"
            value={"Submit"}
            onClick={() => {
              setPublish(true);
            }}
          />
          <input
            className="draft-btn"
            type="submit"
            value={"Save to Draft"}
            onClick={() => {
              setPublish(false);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default FormHandler;
