const { json } = require("express");
const { Thought, User } = require("../models");

module.exports = {
  getAllThought(req, res) {
    Thought.find()
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thoughtsData
          ? res.status(404).json({ message: "THOUGHT WITH THIS ID NOT FOUD🫤" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req, res)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "THOUGHT CREATED, BUT NO USER WITH ID FOUD" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "THOUGHT WITH THAT ID CANNOT BE FOUND😕" })
          : res.status(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "TOUGHT CANNOT BE DELTED, NOT FOUND 😔" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "THOUGHT DELETED BUT NO USER WITH THIS ID 😔" })
          : res.json({ message: "THOUGHT DELETED 👌" })
      )
      .catch((err) => res.json(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "NOW THOUGHT WITH THIS ID" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughId },
      { $pull: { reactions: { responseId: req.params.responseId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "NO THOUGHT WITH THIS ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
