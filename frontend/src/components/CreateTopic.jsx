import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";

const CreateTopic = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [postData, setPostData] = useState();
  const [itemData, setItemData] = useState([]);
  async function fetchItems() {
    const data = await fetch("/posts");
    const items = await data.json();
    setItemData(items);
  }
  useEffect(() => {
    console.log(postData);
  });
  return (
    <div className="container">
      //navbar
      <form method="POST" action="/addpost">
        <input
          type="hidden"
          name="postInput"
          value={"text from hidden input type!!"}
        />
        <input type="submit" value={"Submit"} />
      </form>
      <TextEditor data={setPostData} />
      <button>Cancel</button>
      <div>
        {itemData.map((item) => {
          return <div>{item.posts}</div>;
        })}
      </div>
    </div>
  );
};

export default CreateTopic;
