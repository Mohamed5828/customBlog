import React from "react";
import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { useParams } from "react-router-dom";
import URL from "../tools/config";
import { useDataFetching } from "../tools/DataFetching";

function EditPost() {
  const [submit, setSubmit] = useState();
  const [formData, setFormData] = useState({ title: "", postDescription: "" });
  const [postData, setPostData] = useState("");

  const { id } = useParams();

  const { data, loading, error } = useDataFetching(URL + `/draft/${id}`);

  useEffect(() => {
    if (loading) return;
    setFormData({
      title: `${data.title}`,
      postDescription: `${data.description}`,
      imgs: `${data.imgs}`,
    });
  }, [data]);
  useEffect(() => {
    if (loading) return;
    setPostData(data.drafts);
  }, [data]);
  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }
  //   console.log(postData);

  return (
    <div className="write-container ">
      <form
        method="POST"
        action={
          submit === true
            ? URL + `/deletandaddpost/${id}`
            : URL + `/update/draft/${id}?_method=PUT`
        }
      >
        <input type="hidden" name="postInput" value={postData} />
        <input type="hidden" name="titleInput" value={formData.title} />
        <input
          type="hidden"
          name="description"
          value={formData.postDescription}
        />
        <input type="hidden" name="imgsURL" value={formData.imgs} />
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
          <input
            className="submit-btn"
            type="submit"
            value={"Update Draft"}
            onClick={() => {
              setSubmit(false);
            }}
          />
          <input
            className="submit-btn"
            type="submit"
            value={"Submit as Post"}
            onClick={() => {
              setSubmit(true);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default EditPost;
