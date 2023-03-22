const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const awardwinningSchema = new Schema({
    award_title:{
        type:String,
        require: true
    },
    award_content:{
        type:String,
        require: true
    },
})

module.exports = mongoose.model("awardwinning", awardwinningSchema)