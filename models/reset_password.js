const mongoose = require('mongoose');

const reset_passwordSchema = new mongoose.Schema({

    accesstoken: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isvalid: {
        type: Boolean,
        // default: true,
    }
    
}, {
    timestamps: true,
});

const Reset_password = mongoose.model('Reset_password', reset_passwordSchema);

module.exports = Reset_password;