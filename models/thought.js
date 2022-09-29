//destructer model and schema off of mongoose
const { Schema, model, Types } = require('mongoose');

//order is IMPORTANT!!! since reaction schema is refrenced in the thought schema, it is important that the engine understands what reaction schema is before it is mentioned in the thought schema!!

const reactionSchema = new Schema({
        reactionId: {
            // Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
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
            //Set default value to the current timestamp
            //Use a getter method to format the timestamp on query
            type: Date,
            default: Date.now,
        },
    }, {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);
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
        //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query
        type: Date,
        default: Date.now,
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
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

//use thoughtSchema to build model called thought
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;