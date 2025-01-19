const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role:{
        type:String,
        required:true,
        enum: ["Jobseeker", "Recruiter"], // restrict values

        default: "Jobseeker",
    },
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
},{ timestamps: true}); 

module.exports = mongoose.model("Review", reviewSchema);