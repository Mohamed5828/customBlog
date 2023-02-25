const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPosts = new Schema({
  posts: { type: Object },
});

const draftPosts = new Schema({
  draftPosts: { type: Object },
});

const Posts = mongoose.model("posts", blogPosts, "posts");
const Drafts = mongoose.model("draft", draftPosts, "draft");

const blogData = { Posts: Posts, Drafts: Drafts };

// module.exports = Posts;
module.exports = blogData;
