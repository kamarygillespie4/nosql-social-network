//destructer model and schema off of mongoose
const { Schema, model } = require('mongoose');


// create thought schema
const thoughtSchema = new Schema({
        thoughtText: {
            //is a string
            type: String,
            //is required
            required: true,
            // must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            //TODO:
            //Date
            //Set default value to the current timestamp
            //Use a getter method to format the timestamp on query
        },
        username: {
            //The user that created this thought
            //is a string
            type: String,
            //is required
            required: true,
        },
        // array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    // {
    //   toJSON: {
    //     getters: true,
    //   },
    // }

    //TODO:Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

);

const reactionSchema = new Schema({
    reactionId: {
        //TODO:
        //Use Mongoose's ObjectId data type
        //Default value is set to a new ObjectId
    },
    reactionBody: {
        //is a string
        type: String,
        //is required
        required: true,
        //has a max length of 280 characters
        maxlength: 280,
    },
    username: {
        //is a string
        type: String,
        //is required
        required: true,
    },
    createdAt: {
        //TODO:
        //Date
        //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query
    }
});

//use thoughtSchema to build model called thought
const Thought = model('thought', thoughtSchema);

module.exports = Thought;