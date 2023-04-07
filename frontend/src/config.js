let URL = "";
process.env.NODE_ENV === "mydev"
  ? (URL = "")
  : (URL = "https://mohameds-blog.adaptable.app");

export default URL;
