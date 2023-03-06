import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import "../Styling/components/btn.css";
import "../Styling/components/writePost.css";
import { useParams } from "react-router-dom";
function FormHandler() {
  const [postData, setPostData] = useState("");

  const [publish, setPublish] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
    console.log(formData);
    console.log(postData);
  }
  const { id } = useParams();
  console.log(id);
  return (
    <div className="write-container ">
      <form method="POST" action={publish === true ? "/addpost" : "/adddraft"}>
        <input type="hidden" name="postInput" value={postData} />
        <input type="hidden" name="titleInput" value={formData.title} />
        <div className="inputs">
          <label htmlFor="title" className="title-label">
            Post Title:
          </label>
          <input
            className="title-input"
            type="text"
            placeholder="Enter Title"
            name="title"
            onChange={handleChange}
          />
          <div className="editor">
            <TextEditor setPostData={setPostData} onChange={handleChange} />
          </div>
        </div>
        <div className="btns">
          <input
            type="submit"
            value={"Submit"}
            onClick={() => {
              setPublish(true);
            }}
          />
          <input
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
