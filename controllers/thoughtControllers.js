const { Thought, User } = require('../models');
// ObjectId() method for converting string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
// /api/thoughts
module.exports = {
    // GET to get all thoughts
    //http://localhost:3001/api/thoughts
    getThoughts(req, res) {
        Thought.find()
            //find all thoughts, then return them as json
            .then((thoughts) => res.json(thoughts))
            //error handling
            .catch((err) => res.status(500).json(err));
    },

    // GET to get a single thought by its _id
    //http://localhost:3001/api/thoughts/:thoughtId
    getSingleThought(req, res) {
        //find a thought where the _id matches the one passed in by the request
        Thought.findOne({ _id: req.params.thoughtId })
            //select the __v property and remove it
            .select('-__v')
            //then take that thought
            .then((thought) =>
                !thought ?
                //if it doesn't exist, send message 'No thought with that ID'
                res.status(404).json({ message: 'No thought with that ID' }) :
                //if it does exist, return as json
                res.json(thought)
            )
            //error handling
            .catch((err) => res.status(500).json(err));
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    // // example data
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }

    //http://localhost:3001/api/thoughts
    createThought(req, res) {
        //create a thought based on the body of the request
        Thought.create(req.body)
            //then with that data..
            .then((dbThoughtData) => {
                // find a user with the id that matches the one in the request body, and push the thought ID to the array in the user stored on the thought key
                return User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true })
            })
            //then take all this and return it as a json
            .then(userData => res.json(userData))
            //error handling
            .catch((err) => res.status(500).json(err));
    },

    // PUT to update a thought by its _id
    //http://localhost:3001/api/thoughts/:thoughtId
    updateThought(req, res) {
        //find a thought whos ID matches the one passed in the request parameters and update it with whatever was put into the req body
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((thought) =>
                !thought ?
                //if the thought is not found, return the message 'No thought with this id!'
                res.status(404).json({ message: 'No thought with this id!' }) :
                //if the thought is found, return it as json
                res.json(thought)
            )
            //error handling
            .catch((err) => res.status(500).json(err));
    },

    // DELETE to remove a thought by its _id
    //http://localhost:3001/api/thoughts/:thoughtId
    deleteThought(req, res) {
        //find a thought whos ID matches the one passed in the request parameters and delete it
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => {
                if (!deletedThought) {
                    //if the thought is not found, return the message 'No thought with this id!'
                    res.status(404).json({ message: 'No thought with this id!' });
                }
                //if the thought was deleted, find the user with that thought and pull the thought from their thoughts array
                User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
            })
            //message if successful
            .then(() => res.json({ message: "thought deleted!" }))
            //error handling
            .catch((err) => res.status(500).json(err));
    },

    // http://localhost:3001/api/thoughts/:thoughtId/reactions
    // POST to create a reaction stored in a single thought's reactions array field
    addReaction(req, res) {
        //find a thought whos ID matches the one passed in the request parameters and add the body of the request to its reactions array
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: 'No friend found with that ID :(' }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        //find a thought whos ID matches the one passed in the request parameters and delete it
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: 'No thought found with that ID :(' }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}