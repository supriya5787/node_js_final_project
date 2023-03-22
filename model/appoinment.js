const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    app_departments:{
        type:String,
        require: true
    },
    app_doctors:{
        type:String,
        require: true
    },
    app_date:{
        type:String,
        require: true
    },
    app_time:{
        type:String,
        require: true
    },
    app_name:{
        type:String,
        require: true
    },
    app_phone:{
        type:String,
        require: true
    },
    app_message:{
        type:String,
        require: true
    },
    
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("appointment", appointmentSchema)