const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
    doc_image:{
        type:String,
        require: true
    },
    doc_name:{
        type:String,
        require: true
    },
    doc_dept:{
        type: Schema.Types.ObjectId,
        ref: "department"
    },
    doc_slug:{
        type:String,
        require: true
    },
    doc_intro:{
        type:String,
        require: true
    },
    doc_specialization: {
        type: String,
        required: true
    },
    doc_description:{
        type:String,
        require: true
    },
    doc_q1:{
        type:String,
        require: true
    },
    doc_q2:{
        type:String,
        require: true
    },
    doc_q3:{
        type:String,
        require: true
    },
    doc_q4:{
        type:String,
        require: true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("doctor", doctorSchema)