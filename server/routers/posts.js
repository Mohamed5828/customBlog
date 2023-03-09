const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");

// const multer = require("multer");

const post = Schemas.Posts;
const draft = Schemas.Drafts;
//get all posts to display in all post page
router.get("/posts", async (req, res) => {
  const myPosts = await post.find({}).exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.end(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

//get certain post to display in each blog post page

router.get("/post/:id", async (req, res) => {
  const myPosts = await post
    .findById(`${req.params.id}`)
    .exec((err, postData) => {
      if (err) throw err;
      if (postData) {
        res.end(JSON.stringify(postData));
      } else {
        res.end();
      }
    });
});

//get data from the create post page and send it to the db

router.post("/addpost", async (req, res) => {
  blogPost = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;
  const newPost = new post({
    posts: blogPost,
    title: title,
    description: description,
  });
  try {
    await newPost.save(async (err, newPostResult) => {
      if (err) res.end("Error");
      res.redirect("/postsubmitted");

      res.end();
    });
  } catch {
    console.log(err);
    res.redirect("/postsubmitted");
    res.end("post Failed");
  }
});

//get post by id and update it
router.put("/update/:id", async (req, res) => {
  const posts = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;

  post.findById(req.parmas.id).then((editedPost) => {
    editedPost.posts = posts;
    editedPost.title = title;
    editedPost.description = description;

    editedPost
      .save()
      .then(() => res.json("Edited"))
      .catch((err) => res.status(400).json(`Error ${err}`));
  });
});

router.post("/delete/:id", async (req, res) => {
  await post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//get all drafts to display in draft page

router.get("/drafts", async (req, res) => {
  const myDrafts = await draft.find({}).exec((err, draftData) => {
    if (err) throw err;
    if (draftData) {
      res.end(JSON.stringify(draftData));
    } else {
      res.end();
    }
  });
});

//get data from the create post page and send it to the db

router.post("/adddraft", async (req, res) => {
  const draftPost = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;
  const newDraft = new draft({
    drafts: draftPost,
    title: title,
    description: description,
  });
  try {
    await newDraft.save(async (err, newDraftResult) => {
      if (err) res.end("Error");
      res.redirect("/drafts");
      res.end();
    });
  } catch {
    console.log(err);
    res.redirect("/drafts");
    res.end("draft Failed");
  }
});
router.post("/deletedraft/:id", async (req, res) => {
  await draft.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
