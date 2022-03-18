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