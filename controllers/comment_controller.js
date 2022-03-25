const comment = require('../models/comment');
const post = require('../models/post');

module.exports.createComment = function (req, res) {
    post.findById(req.body.post, function (err, post) {
        if (err) {
            console.log("Error while finding post in comment creation");
            return;
        }
        if (post) {
            comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id,
            }, function (err, comment) {
                if (err) {
                    console.log("Error while creating comments");
                    return;
                }

                post.comments.push(comment);
                post.save();
                
                return res.redirect('back');
            });
        }
    });
}