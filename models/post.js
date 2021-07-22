var mongoose = require("mongoose");


var postSchema = mongoose.Schema({
    title: {type: String, required:true},
    content: {type:String, required:false},
    createdAt: {type:Date, default:Date.now},
    image:{type:mongoose.Schema.Types.ObjectId, required:false, unique:false },
    userID:{type:mongoose.Schema.Types.ObjectId, required:false, unique:false},
    public:{type:Boolean, default:true, required:false,unique:false},
    
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;