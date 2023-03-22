const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const testimonalSchema = new Schema({
    testimonial_image:{
        type:String,
        require: true
    },
    testimonial_title:{
        type:String,
        require: true
    },
    testimonial_name:{
        type:String,
        require: true
    },
    testimonial_content:{
        type:String,
        require: true
    },
})

module.exports = mongoose.model("testimonal", testimonalSchema)