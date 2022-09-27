const { Schema, model } = require('mongoose');
//require thought model
const thoughtSchema = require('./thought');

// Schema to create Student model
const userSchema = new Schema({
        username: {
            //is a string
            type: String,
            //is required
            required: true,
            //is unique
            unique: true,
            //make trimmed
            trim: true,
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
        //Array of _id values referencing the Thought model
        thoughts: [thoughtSchema],
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