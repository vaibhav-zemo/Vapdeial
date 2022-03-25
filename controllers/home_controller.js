const post = require('../models/post');
const comment = require('../models/comment');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('nthing',789);

    post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function (err,post) { 
        if (err) {
            console.log("Error while finding post");
        }
        return res.render('home', {
            title: 'Home',
            posts: post,
        });
    });

}