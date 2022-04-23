const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        
    },
    // this defines the object id of the liked object
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // model on which like will define
    onModel:{
        type: String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;