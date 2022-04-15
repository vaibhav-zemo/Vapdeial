const Comment = require('../models/comment');
const Post = require('../models/post');
const comment_mailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../worker/comment_email_worker');

module.exports.createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        // if (post) {
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id,
        });
        // }

        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email');

        // comment_mailer.newComment(comment);

        let job = queue.create('emails', comment).save(function (err) {
            if (err) {
                console.log('Error in sending to the queue', err);
                return;
            }
            console.log("Job ", job.id);
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Comment Created"
            });
        }

        req.flash('success', "Your comment is published");
        return res.redirect('back');

    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            comment.remove();

            let post = await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.id } })

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Destroyed"
                });
            }
            req.flash('success', "Your comment is deleted");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }

}