const user  = require('../models/user')

module.exports.profile = function (req,res) {
   return res.render('profile',{
       title:'Profile'
   });
}

module.exports.post = function (req,res) {
    return res.render('post',{
        title:'Posts'
    });
}

module.exports.sign_in = function (req,res) {
    return res.render('sign_in',{
        title:'Sign In'
    })
}

module.exports.sign_up = function (req,res) {
    return res.render('sign_up',{
        title:'Sign Up'
    })
}

module.exports.create_user = function (req,res) {
    user.create({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    },function (err,data) {
        if (err) {
            console.log("Error while creating the user");
            return;
        }
        return res.redirect('/user/profile');
    });
}

// module.exports.check_user = function (req,res) {
//     user.findById(req.body.id,function (err) {
        
//     })
// }