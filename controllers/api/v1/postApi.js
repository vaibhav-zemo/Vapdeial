const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    try {

        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });


        return res.json(200, {
            message: 'List of posts',
            post: posts
        });

    } catch (err) {
        return res.json(500, {
            message: 'Some Error has occured',
        });
    }

};

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        return res.json(200, {
            message: "Post and Comments are deleted"
        });

    } catch (err) {
        return res.json(404, {
            message: "Error!"
        })
    }
}