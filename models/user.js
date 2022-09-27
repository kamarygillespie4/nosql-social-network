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
            //TODO: TEST
            //Must match a valid email address (look into Mongoose's matching validation)
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        //Array of _id values referencing the Thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        //Array of _id values referencing the User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
    },

    //schema settings
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);
//Mongoose virtuals are document properties that you can get and set but are not saved in MongoDB. These properties are computed whenever you access them. Virtual properties are useful for formatting and combining fields, and de-composing a single value into multiple values before storing in the collection
//Add functions onto models but they won't exist as keys in database

//Virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
    //the length will be the number of objects in the friends array. The objects are users
});

const User = model('User', userSchema);

module.exports = User;