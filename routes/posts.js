const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");

//Create New Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your own posts!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only delete your own posts!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ])
      .exec()
      .then((result) => result);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;

    if (username) {
      posts = await Post.aggregate([
        { $match: { username } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
        .exec()
        .then((result) => result);
    } else if (catName) {
      posts = await Post.aggregate([
        {
          $match: {
            categories: {
              $in: [catName],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
        .exec()
        .then((result) => result);
    } else {
      posts = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
        .exec()
        .then((result) => result);
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
