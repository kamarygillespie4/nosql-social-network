const { Schema, model } = require('mongoose');
//TODO: require reaction model

// Schema to create Student model
const thoughtSchema = new Schema({
        thoughtText: {
            //is a string
            type: String,
            //is required
            required: true,

            //TODO: must be between 1 and 280 characters
            //
        },
        createdAt: {
            //TODO:
            //Date
            //Set default value to the current timestamp
            //Use a getter method to format the timestamp on query
        },
        username: {
            //TODO: The user that created this thought
            //is a string
            type: String,
            //is required
            required: true,
        },
        reactions: {
            //TODO: Array of nested documents created with the reactionSchema
        },
    },
    // {
    //   toJSON: {
    //     getters: true,
    //   },
    // }

    //TODO:Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;