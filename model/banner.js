const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const bannerSchema = new Schema({
    image:{
        type:String,
        require: true
    },
    title:{
        type:String,
        require: true
    },
    content:{
        type:String,
        require: true
    },
    bannercard:{
        type: Schema.Types.ObjectId,
        ref: "bannercard"
    },

    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("banner", bannerSchema)