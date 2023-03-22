const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const messegeSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    subject:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("messege", messegeSchema)