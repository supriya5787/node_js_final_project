const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const commentSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    name:{
        type:String,
        require: true
    },
    // email:{
    //     type:String,
    //     require: true
    // },
    comment:{
        type:String,
        require: true
    },
    status:{
        type: Boolean,
        default:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("comment", commentSchema)