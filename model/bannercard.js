const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const bannercardsSchema = new Schema({

            icon_one : {
                type: String,
                require: true
            },
            subtitle_one : {
                type: String,
                require: true
            },
            title_one : {
                type: String,
                require: true
            },
            description_one : {
                type: String,
                require: true
            },

            
            icon_two : {
                type: String,
                require: true
            },
            subtitle_two : {
                type: String,
                require: true
            },
            title_two : {
                type: String,
                require: true
            },
            description_two : {
                type: String,
                require: true
            },


            icon_three : {
                type: String,
                require: true
            },
            subtitle_three : {
                type: String,
                require: true
            },
            title_three : {
                type: String,
                require: true
            },
            day1_three : {
                type: String,
                require: true
            },
            day2_three : {
                type: String,
                require: true
            },
            day3_three : {
                type: String,
                require: true
            },
            time1_three : {
                type: String,
                require: true
            },
            time2_three : {
                type: String,
                require: true
            },
            time3_three : {
                type: String,
                require: true
            },
            banner:{
                type: Schema.Types.ObjectId,
                ref: "banner"
            },
            
   
    
      
            // cardtypetwosubtitle : {
            //     type: String,
            //     require: true
            // },
            // cardtypetwotitle : {
            //     type: String,
            //     require: true
            // },
            // cardtypetwodescription : {
            //     type: String,
            //     require: true
            // },


       
            // cardtypethreesubtitle : {
            //     type: String,
            //     require: true
            // },
            // cardtypethreetitle : {
            //     type: String,
            //     require: true
            // },
            // cardtypethreetime : {
            //     type: String,
            //     require: true
            // }
        })

module.exports = mongoose.model("bannercards", bannercardsSchema)
