const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviroment');

module.exports.createSession = async function (req,res) {
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(404,{
                message:"Invalid Password/email"
            });
        }

        return res.json(200,{
            message:"You just SignIn",
            data:{
                token: jwt.sign(user.toJSON(),env.jwt_screat,{expiresIn:'100000'})
            }
        })

    } catch (error) {
        return res.json(404,{
            message:"Error!"
        });
    }
}