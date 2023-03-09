const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPosts = new Schema({
  posts: { type: Object },
  title: { type: String },
  description: { type: String },
});

const draftPosts = new Schema({
  drafts: { type: Object },
  title: { type: String },
  description: { type: String },
});

const Posts = mongoose.model("posts", blogPosts, "posts");
const Drafts = mongoose.model("draft", draftPosts, "draft");

const blogData = { Posts: Posts, Drafts: Drafts };

// module.exports = Posts;
module.exports = blogData;
