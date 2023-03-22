const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const departmentSchema = new Schema({
    dept_image:{
        type:String,
        require: true
    },
    dept_name:{
        type:String,
        require: true
    },
    dept_description:{
        type:String,
        require: true
    },
    dept_mh:{
        type:String,
        require: true
    },
    dept_sf:{
        type:String,
        require: true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("department", departmentSchema)