const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");

router.get("/posts", async (req, res) => {
  const post = Schemas.Posts;
  const myPosts = await post.find({}).exec((err, postData) => {
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
  const title = req.body.titleInput;
  const newPost = new Schemas.Posts({ posts: post, title: title });
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
router.post("/adddraft", async (req, res) => {
  const draft = req.body.postInput;
  const title = req.body.titleInput;
  const newDraft = new Schemas.Drafts({ drafts: draft, title: title });
  try {
    await newDraft.save(async (err, newDraftResult) => {
      if (err) res.end("Error");
      // res.redirect("/posts");
      res.end();
    });
  } catch {
    console.log(err);
    // res.redirect("/posts");
    res.end("draft Failed");
  }
});

module.exports = router;
