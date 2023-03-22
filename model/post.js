const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        require: true
    },
    subtitle:{
        type:String,
        require: true
    },
    content:{
        type:String,
        require: true
    },
    image:{
        type:String,
        require: true
    },
    review:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: Boolean,
        default:false
    },
})

module.exports = mongoose.model("post", postSchema)