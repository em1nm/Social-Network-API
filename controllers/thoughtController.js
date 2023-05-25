const { Thought, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No user with that ID" })
        : res.status(200).json("Thought deleted")
    );
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: new ObjectId(req.body.reactionsID) } },
      { new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      {
        _id: req.params.thoughtId,
        $pull: { reactions: new ObjectId(req.body.reactionsID) },
      },
      { new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json({ message: "Reaction Deleted" });
      })
      .catch((err) => res.status(500).json(err));
  },
};