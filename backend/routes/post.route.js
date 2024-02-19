const express = require("express");
const { postModel } = require("../models/post.model");
const { auth } = require("../middlewares/auth.middleware");
const postsRouter = express.Router();

postsRouter.get("/", auth, async (req, res) => {
  const {limit  }= req.query
  try {
    const posts = await postModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postsRouter.get("/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postModel.findById({ _id: postId });
    if (!post) {
      return res.status(404).send({ error: "post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postsRouter.post("/", auth,  async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.status(201).send({ message: "post added successfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postsRouter.patch("/:postId", auth,  async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postModel.findById({ _id: postId });
    if (req.body.userID == post.userID) {
      await postModel.findByIdAndUpdate({ _id: postId }, req.body);
      res.status(204).send({ msg: `Post with ID ${postId} has been updated` });
    } else {
      res.status(204).send({ msg: "You are not authorised" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postsRouter.delete("/:postId", auth,  async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postModel.findOne({ _id: postId });
    if (req.body.userID == post.userID) {
      await postModel.findByIdAndDelete({ _id: postId }, req.body);
      res.status(202).send({ msg: `Post with ID ${postId} has been deleted` });
    } else {
      res.status(202).send({ msg: "You are not authorised" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = { postsRouter };
