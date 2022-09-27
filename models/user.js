const { Schema, model } = require('mongoose');
//TODO: require thought model

// Schema to create Student model
const userSchema = new Schema({
        username: {
            //is a string
            type: String,
            //is required
            required: true,
            //is unique
            unique: true,
            //TODO: make trimmed
            //
        },
        email: {
            //is a string
            type: String,
            //is required
            required: true,
            //is unique
            unique: true,
            //TODO: Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: {
            //TODO: Array of _id values referencing the Thought model
        },
        friends: {
            //TODO:Array of _id values referencing the User model (self-reference)
        },
    },
    // {
    //   toJSON: {
    //     getters: true,
    //   },
    // } 

    //schema settings

    //TODO:Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

);

const User = model('user', userSchema);

module.exports = User;