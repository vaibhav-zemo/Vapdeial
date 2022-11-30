const post = require('../models/post');
const user = require('../models/user');
const comment = require('../models/comment');
const Like = require('../models/likes');

module.exports.createPost = async function (req, res) {
  try {
    post.uploadImg(req, res, function (err) {
      if (err) {
        console.log('*****Multer Error: ', err);
      }

      if (req.file) {
        let posts = post.create({
          content: req.body.content,
          user: req.user._id,
          img: post.imgPath + '/' + req.file.filename,
        });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post: posts,
            },
            message: 'Post Created!',
          });
        }
      }
      else{
        let posts = post.create({
          content: req.body.content,
          user: req.user._id,
        });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post: posts,
            },
            message: 'Post Created!',
          });
        }
      }

      req.flash('success', 'Post is successfully published');
      return res.redirect('/');
    });
  } catch (err) {
    console.log('Error', err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let posts = await post.findById(req.params.id);

    if (posts.user == req.user.id) {
      await Like.deleteMany({ likeable: posts, onModel: 'Post' });
      await Like.deleteMany({ _id: { $in: posts.comments } });
      posts.remove();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'Post deleted',
        });
      }

      comment.deleteMany({ post: req.params.id }, function (err) {
        req.flash('success', 'Post and respective comments are deleted');
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error', err);
    return;
  }
};
