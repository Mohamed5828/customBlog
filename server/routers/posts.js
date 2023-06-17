const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");
const multer = require("multer");
const fs = require("fs");
const cache = require("../cache");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("./firebase");
process.env.NODE_ENV === "mydev"
  ? (URL = "")
  : (URL = "https://helpful-speculoos-4bda58.netlify.app");

const post = Schemas.Posts;
const draft = Schemas.Drafts;

//multer config

const Storage = multer.memoryStorage({});
const upload = multer({ storage: Storage });
router.post("/uploadimg/:id", upload.single("file"), async (req, res) => {
  const storageRef = ref(storage, `${req.file.originalname}`);
  const metadata = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return res.send({
    success: true,
    name: req.file.originalname,
    type: req.file.mimetype,
    downloadURL: downloadUrl,
  });
});

function typeChecker(reqType) {
  if (reqType == "post") {
    return post;
  } else {
    return draft;
  }
}

//get all posts to display in all post page
router.get("/posts/:type", cache, async (req, res) => {
  const Type = req.params.type;
  let schemaCollection = typeChecker(Type);
  const myData = await schemaCollection.find({}).exec((err, Data) => {
    if (err) throw err;
    if (Data) {
      res.end(JSON.stringify(Data));
    } else {
      res.end();
    }
  });
});

router.get("/enviroment", async (req, res) => {
  res.json({
    env: `Running in ${URL}`,
  });
});

//searching for post by title

router.get("/postsearch/:title", cache, async (req, res) => {
  // console.log(`${req.params.title}`);
  const myPosts = await post
    .find({ title: { $regex: req.params.title, $options: "i" } })
    .exec((err, postData) => {
      if (err) throw err;
      if (postData) {
        res.end(JSON.stringify(postData));
      } else {
        res.end();
      }
    });
});

//get certain post to display in each blog post page

router.get("/:type/:id", cache, async (req, res) => {
  const Type = req.params.type;
  let schemaCollection = typeChecker(Type);
  const myData = await schemaCollection
    .findById(`${req.params.id}`)
    .exec((err, Data) => {
      if (err) throw err;
      if (Data) {
        res.end(JSON.stringify(Data));
      } else {
        res.end();
      }
    });
});
//get certain post to display in update post page

router.get("/updatetype/:type/:id", cache, async (req, res) => {
  const Type = req.params.type;
  let schemaCollection = typeChecker(Type);
  const myData = await schemaCollection
    .findById(`${req.params.id}`)
    .exec((err, Data) => {
      if (err) throw err;
      if (Data && Data != "") {
        res.end(JSON.stringify(Data));
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
  const imgs = req.body.imgsURL;
  const featured = req.body.featured;
  const newPost = new post({
    posts: blogPost,
    title: title,
    description: description,
    imgs: imgs,
    featured: featured,
  });
  try {
    await newPost.save(async (err, newPostResult) => {
      if (err) res.end("Error");
      res.redirect(URL + "/postsubmitted");

      res.end();
    });
  } catch {
    console.log(err);
    res.end("post Failed");
  }
});

//get post by id and update it
router.post("/update/:type/:id", async (req, res) => {
  const Type = req.params.type;
  let schemaCollection = typeChecker(Type);
  const post = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;
  const featured = req.body.featured;

  schemaCollection.findByIdAndUpdate(req.params.id).then((editedPost) => {
    Type == "post" ? (editedPost.posts = post) : (editedPost.drafts = post);
    editedPost.title = title;
    editedPost.description = description;
    editedPost.featured = featured;

    editedPost
      .save()
      .then(() => res.redirect(URL + "/"))
      .catch((err) => res.status(400).json(`Error ${err}`));
  });
});

router.post("/delete/:type/:id", async (req, res) => {
  // find a way to get to the imgs name used in the post to be deleted
  // post.findById(req.params.id).then( (postToBeDeleted)=>{
  //   const image = postToBeDeleted.imgs;
  //   const storageRef = ref(storage, image);
  //   deleteObject(storageRef)
  // })
  const Type = req.params.type;
  let schemaCollection = typeChecker(Type);
  await schemaCollection.findByIdAndDelete(req.params.id);
  res.redirect(URL + "/");
});

//get data from the create post page and send it to the db

router.post("/adddraft", async (req, res) => {
  const draftPost = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;
  const imgs = req.body.imgsURL;
  const newDraft = new draft({
    drafts: draftPost,
    title: title,
    description: description,
    imgs: imgs,
  });
  try {
    await newDraft.save(async (err, newDraftResult) => {
      if (err) res.end("Error");
      res.redirect(URL + "/drafts");
      res.end();
    });
  } catch {
    console.log(err);
    res.redirect(URL + "/drafts");
    res.end("draft Failed");
  }
});

router.post("/deletandaddpost/:id", async (req, res) => {
  await draft.findByIdAndDelete(req.params.id);
  const blogPost = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;
  const imgs = req.body.imgsURL;
  const newPost = new post({
    posts: blogPost,
    title: title,
    description: description,
    imgs: imgs,
  });
  try {
    await newPost.save(async (err, newPostResult) => {
      if (err) res.end("Error");
      res.redirect(URL + "/postsubmitted");

      res.end();
    });
  } catch {
    console.log(err);
    res.end("post Failed");
  }
});

module.exports = router;
