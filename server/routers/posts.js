const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");
const multer = require("multer");
const fs = require("fs");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyBwKmYvl6eAKik33o-e7uAp_wS1m6wNVIY",
  authDomain: "blogimgupload-3998a.firebaseapp.com",
  projectId: "blogimgupload-3998a",
  storageBucket: "blogimgupload-3998a.appspot.com",
  messagingSenderId: "947780559632",
  appId: "1:947780559632:web:e114389b99cf849a18fb95",
};
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

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

//searching for post by title

router.get("/postsearch/:title", async (req, res) => {
  console.log(`${req.params.title}`);
  const myPosts = await post
    .find({ title: `${req.params.title}` })
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
//get certain post to display in update post page

router.get("/updatepost/:id", async (req, res) => {
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
      res.redirect("/postsubmitted");

      res.end();
    });
  } catch {
    console.log(err);
    res.end("post Failed");
  }
});

//get post by id and update it
router.post("/update/:id", async (req, res) => {
  const posts = req.body.postInput;
  const title = req.body.titleInput;
  const description = req.body.description;

  post.findByIdAndUpdate(req.params.id).then((editedPost) => {
    editedPost.posts = posts;
    editedPost.title = title;
    editedPost.description = description;

    editedPost
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => res.status(400).json(`Error ${err}`));
  });
});

router.post("/delete/:id", async (req, res) => {
  // find a way to get to the imgs name used in the post to be deleted
  // post.findById(req.params.id).then( (postToBeDeleted)=>{
  //   const image = postToBeDeleted.imgs;
  //   const storageRef = ref(storage, image);
  //   deleteObject(storageRef)
  // })
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
      res.redirect("/drafts");
      res.end();
    });
  } catch {
    console.log(err);
    res.redirect("/drafts");
    res.end("draft Failed");
  }
});

router.get("/draft/:id", async (req, res) => {
  const mydraft = await draft
    .findById(`${req.params.id}`)
    .exec((err, draftData) => {
      if (err) throw err;
      if (draftData) {
        res.end(JSON.stringify(draftData));
      } else {
        res.end();
      }
    });
});

router.get("/updatedraft/:id", async (req, res) => {
  const myDraft = await draft
    .findById(`${req.params.id}`)
    .exec((err, draftData) => {
      if (err) throw err;
      if (draftData) {
        res.end(JSON.stringify(draftData));
      } else {
        res.end();
      }
    });
});

router.post("/deletedraft/:id", async (req, res) => {
  await draft.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.post("/deletandaddpost/:id", async (req, res) => {
  await draft.findByIdAndDelete(req.params.id);
  blogPost = req.body.postInput;
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
      res.redirect("/postsubmitted");

      res.end();
    });
  } catch {
    console.log(err);
    res.end("post Failed");
  }
});

module.exports = router;
