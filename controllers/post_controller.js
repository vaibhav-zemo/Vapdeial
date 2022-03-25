const post = require('../models/post')

module.exports.createPost = function (req, res) {
    post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, data) {
        if (err) {
            console.log("Error while creating Post");
            return;
        }

        return res.redirect('/');
    });
}