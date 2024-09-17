const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema=new Schema({
    nam:String,
    comment:String,
    rating:{
         type:String,
         min:1,
         max:5,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
});

module.exports= mongoose.model("review",reviewSchema);