const user = require('../models/user');
const friend = require('../models/friendship');

module.exports.toggle_friend = async function (req, res) {
    try {
        let flag = false;
        let Friendship = await friend.findOne({
            from_user: req.user._id,
            to_user: req.query.id,
        });

        let friend_user = await user.findOne({ email: req.user.email });
        
        if (Friendship) {
            friend_user.friendship.pull(Friendship._id);
            friend_user.save();

            Friendship.remove();
            flag = true;
            
        }
        else {
            let newfriendship = await friend.create({
                from_user: req.user._id,
                to_user: req.query.id,
            });

            friend_user.friendship.push(newfriendship._id);
            friend_user.save();
        }

        if(req.xhr){
            
            return res.json({
                data: {
                    flag: flag
                },
                message: "Request successful"
            });
        }
        return res.redirect('back');
            
    } catch (err) {
        console.log("Error while toggling friend", err);
    }
};