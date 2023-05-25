const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        toJSON: {
            virtuals: true,
        },
    }
)

userSchema
.virtuals('friendCount')
.get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);
module.exports = User;