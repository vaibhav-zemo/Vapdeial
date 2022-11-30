const post = require('../models/post');
const user = require('../models/user');
const comment = require('../models/comment');
const likes = require('../models/likes');
const friendship = require('../models/friendship');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('nthing',789);
    try {

        let posts = await post.find({})
            .sort('-createdAt')
            .populate('user','name email avatar')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            }).populate('likes');

        let users = await user.find({}).populate('friendship');
        let friends = await friendship.find({}).populate('to_user');


        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_user: users,
            friends: friends,
        });

    } catch (err) {
        console.log("Error", err);
        return;
    }

}