const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    image:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("service", serviceSchema)