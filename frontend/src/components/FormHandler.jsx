import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
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

  return (
    <div className="container">
      //navbar
      <form method="POST" action={publish === true ? "/addpost" : "/adddraft"}>
        <input type="hidden" name="postInput" value={postData} />
        <input type="hidden" name="titleInput" value={formData.title} />
        <label htmlFor="title">Post Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
        />
        <TextEditor setPostData={setPostData} onChange={handleChange} />
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
      </form>
    </div>
  );
}

export default FormHandler;
