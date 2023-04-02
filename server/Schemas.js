const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPosts = new Schema({
  posts: { type: Object },
  title: { type: String },
  description: { type: String },
  imgs: { type: Array },
});

const draftPosts = new Schema({
  drafts: { type: Object },
  title: { type: String },
  description: { type: String },
  imgs: { type: Array },
});

const images = new Schema({
  name: { type: String },
  image: { data: Buffer, contentType: String },
});
const Posts = mongoose.model("posts", blogPosts, "posts");
const Image = mongoose.model("images", images, "images");
const Drafts = mongoose.model("draft", draftPosts, "draft");

const blogData = { Posts: Posts, Drafts: Drafts, Image: Image };

// module.exports = Posts;
module.exports = blogData;
