///api/users
// ObjectId() method for converting string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;



const { Thought, User } = require('../models');

module.exports = {
    //GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    //GET a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //POST a new user:

    // example data
    //{
    // "username": "lernantino",
    ///// "email": "lernantino@gmail.com"
    //}
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with this id!' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //DELETE to remove user by its _id

    //BONUS: Remove a user's associated thoughts when deleted.
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID' }) :
                Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    }

    ///api/users/:userId/friends/:friendId

    //POST to add a new friend to a user's friend list

    //DELETE to remove a friend from a user's friend list



}