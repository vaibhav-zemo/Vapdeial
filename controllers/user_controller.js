const user = require("../models/user");
const friendship = require("../models/friendship");
const passport = require("passport");
const reset_password = require("../models/reset_password");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const forgot_mailer = require("../mailers/forgot");

module.exports.profile = async function (req, res) {
  try {
    let users = await user.findById(req.params.id);

    let friend = await friendship.findOne({
      from_user: req.user._id,
      to_user: req.params.id,
    });

    let have = false;
    if (friend) {
      have = true;
    }

    return res.render("profile", {
      title: "Profile",
      profile_user: users,
      have: have,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.update_info = async function (req, res) {
  // if (req.params.id == req.user.id) {
  //     user.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
  //         return res.redirect('/');
  //     });
  // }
  // else {
  //     return res.status(401).send('Unauthorized');
  // }

  if (req.params.id == req.user.id) {
    try {
      let data = await user.findById(req.params.id);

      user.uploadAvatar(req, res, function (err) {
        if (err) console.log("Multer Error", err);
        
        data.name = req.body.name;
        data.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          data.avatar = user.avatarPath + "/" + req.file.filename;
        }
        data.save();
        req.flash("success", "Profile is updated");
        return res.redirect("back");
      });
    } catch (err) {
      console.log("Error", err);
      return;
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports.post = function (req, res) {
  return res.render("post", {
    title: "Posts",
  });
};

module.exports.sign_in = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign_in", {
    title: "Sign In",
  });
};

module.exports.sign_up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.forgot = function (req, res) {
  return res.render("forgot", {
    title: "Forgot Password Page",
  });
};

module.exports.reset = async function (req, res) {
  // console.log("***************************req.body.email", req.body);

  let User = await user.findOne({ email: req.body.email });
  if (!User) {
    return res.redirect("back");
  }

  let rest = await reset_password.create({
    accesstoken: crypto.randomBytes(20).toString("hex"),
    user: User.id,
    isvalid: true,
  });

  forgot_mailer.forgot(req.body.email);
  return res.render("wait", {
    title: "Wait",
  });
};

module.exports.wait = function (req, res) {
  return res.render("wait", {
    title: "WAIT",
  });
};

module.exports.change = async function (req, res) {
  let reset = await reset_password.findOne({ accesstoken: req.params.id });
  if (reset.isvalid) {
    reset.isvalid = false;
    reset.save();
    return res.render("change", {
      title: "Change Your Password",
      token: req.params.id,
    });
  }
  return res.send("<h1> Link is Expired!! </h1>");
};

module.exports.change_password = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  let reset = await reset_password.findOne({ accesstoken: req.params.id });
  let resetPopulate = await reset.populate("user", "email password");

  let User = await user.findOneAndUpdate({ email: resetPopulate.user.email });

  if (!User) {
    console.log("user not found");
    return res.redirect("back");
  }

  User.password = req.body.confirm_password;
  console.log("********user  change", User);
  User.save();
  return res.redirect("/");
};

module.exports.create_user = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    let users = await user.findOne({ email: req.body.email });

    if (!users) {
      user.create(req.body, function (err, data) {
        return res.redirect("/user/profile/data.id");
      });
    } else {
      return res.redirect("/user/sign_in");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
  // console.log(req.body);
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Successfully Logged In");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "Successfully Logged Out");
  req.logout();

  return res.redirect("/");
};
