const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const IMG_PATH = path.join('/upload/posts/images');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Like'
    },
    img:{
        type: String,
    }
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', IMG_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


PostSchema.statics.uploadImg = multer({ storage: storage }).single('img');
PostSchema.statics.imgPath = IMG_PATH;


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;