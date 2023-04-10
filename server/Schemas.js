const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPosts = new Schema(
  {
    posts: { type: Object },
    title: { type: String },
    description: { type: String },
    imgs: { type: Array },
    featured: { type: Boolean },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const draftPosts = new Schema(
  {
    drafts: { type: Object },
    title: { type: String },
    description: { type: String },
    imgs: { type: Array },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Posts = mongoose.model("posts", blogPosts, "posts");
const Drafts = mongoose.model("draft", draftPosts, "draft");

const blogData = { Posts: Posts, Drafts: Drafts };

module.exports = blogData;
