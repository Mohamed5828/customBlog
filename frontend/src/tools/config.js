let URL = "";
process.env.NODE_ENV === "development"
  ? (URL = "")
  : (URL = "https://mohamed-blog-cutom.onrender.com");

export default URL;
