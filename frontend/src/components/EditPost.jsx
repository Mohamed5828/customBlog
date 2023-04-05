import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { useParams } from "react-router-dom";

function EditPost() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState();
  const [formData, setFormData] = useState({ title: "", postDescription: "" });
  const [postData, setPostData] = useState("");

  const { id } = useParams();

  async function fetchItems() {
    const data = await fetch(`/post/${id}`);
    const items = await data.json();
    setItemData(items);
  }

  useEffect(() => {
    if (itemData == null) return;
    setFormData({
      title: `${itemData.title}`,
      postDescription: `${itemData.description}`,
    });
  }, [itemData]);
  useEffect(() => {
    if (itemData == null) return;
    setPostData(itemData.posts);
  }, [itemData]);
  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }
  // console.log(itemData);

  return (
    <div className="write-container ">
      <form method="POST" action={`/update/post/${id}?_method=PUT`}>
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
            <TextEditor setPostData={setPostData} postData={postData} />
          </div>
        </div>
        <div className="form-btns">
          <input className="submit-btn" type="submit" value={"Update"} />
        </div>
      </form>
    </div>
  );
}

export default EditPost;
