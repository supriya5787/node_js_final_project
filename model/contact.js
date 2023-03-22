const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    icon_class:{
        type:String,
        require: true
    },
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("contact", contactSchema)