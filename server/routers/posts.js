const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");

router.get("/posts", async (req, res) => {
  const post = Schemas.Posts;
  const myPosts = await post.find({}, (err, postData) => {
    if (err) throw err;
    if (postData) {
      res.end(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

router.post("/addpost", async (req, res) => {
  const post = req.body.postInput;
  const newPost = new Schemas.Posts({ posts: post });
  try {
    await newPost.save(async (err, newPostResult) => {
      if (err) res.end("Error");
      // res.redirect("/posts");
      res.end();
    });
  } catch {
    console.log(err);
    // res.redirect("/posts");
    res.end("post Failed");
  }
});

module.exports = router;
