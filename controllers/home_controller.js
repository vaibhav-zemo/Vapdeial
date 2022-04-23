const post = require('../models/post');
const user = require('../models/user');
const comment = require('../models/comment');
const likes = require('../models/likes');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('nthing',789);
    try {

        let posts = await post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate:{
                    path:'likes'
                }
            }).populate('likes');

        let users = await user.find({});

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_user: users
        });

    } catch (err) {
        console.log("Error", err);
        return;
    }

}