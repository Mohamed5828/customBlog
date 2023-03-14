import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import "../Styling/components/btn.css";
import "../Styling/components/writePost.css";

function FormHandler() {
  const [files, setFiles] = useState([]);

  const [postData, setPostData] = useState("");

  const [publish, setPublish] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    postDescription: "",
  });
  function onFilesChange(file) {
    setFiles((prevFiles) => {
      return { ...prevFiles, file };
    });
    console.log(files);
  }
  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
    console.log(formData);
    console.log(postData);
  }

  return (
    <div className="write-container ">
      <form method="POST" action={publish === true ? "/addpost" : "/adddraft"}>
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
          <div className="editor">
            <TextEditor
              setPostData={setPostData}
              postData={postData}
              onFilesChange={onFilesChange}
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
