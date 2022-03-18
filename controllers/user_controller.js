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
    // console.log(req.body);
    if (req.body.password !=  req.body.confirm_password) {
        return res.redirect('back');
    }

    user.findOne({email:req.body.email},function (err,data) {
        if (err) {
            console.log("Error while creating user");
            return;
        }

        if (!data) {       
            user.create(req.body,function (err,data) {
            if (err) {
                console.log("Error while creating the user");
                return;
            }
            return res.redirect('/user/profile');
            });
        }
        else{
            return res.redirect('/user/sign_in');
        }
    });
}

// module.exports.check_user = function (req,res) {
//     user.findById(req.body.id,function (err) {
        
//     })
// }