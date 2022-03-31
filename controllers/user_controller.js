const user = require('../models/user')
const passport = require('passport');

module.exports.profile = function (req, res) {
    user.findById(req.params.id, function (err, data) {
        return res.render('profile', {
            title: 'Profile',
            profile_user: data
        });
    });
}

module.exports.update_info = function (req, res) {
    if (req.params.id == req.user.id) {
        user.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            return res.redirect('/');
        });
    }
    else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.post = function (req, res) {
    return res.render('post', {
        title: 'Posts'
    });
}

module.exports.sign_in = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('sign_in', {
        title: 'Sign In'
    })
}

module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('sign_up', {
        title: 'Sign Up'
    })
}

module.exports.create_user = async function (req, res) {

    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        let users = await user.findOne({ email: req.body.email });

        if (!users) {
            user.create(req.body, function (err, data) {
                return res.redirect('/user/profile/data.id');
            });
        }
        else {
            return res.redirect('/user/sign_in');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
    // console.log(req.body);

}

module.exports.createSession = function (req, res) {
    req.flash('success','Successfully Logged In');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.flash('success','Successfully Logged Out');
    req.logout();

    return res.redirect('/');
}
