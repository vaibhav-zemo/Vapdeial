const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship',friendSchema);

module.exports = Friendship;