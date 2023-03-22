const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    phone:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    role:{
        type:String,
        require: true,
        default: "Basic"
    },
    flag:{
        type: Boolean,
        default: false
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("user", userSchema)