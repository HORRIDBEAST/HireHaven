const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const Job = require("../models/jobModel");
const axios = require('axios');
const asyncHandler = require('express-async-handler');

// const post_Review = asyncHandler(async (req, res) => {
//         //console.log(objectId(req.oidc.user.id));
//             const user = await User.findById(req.oidc.user.id);

//     const isAuth=req.oidc.isAuthenticated() || user.email;

//         if(!isAuth){
//             return res.status(401).json({message:"Not Authuriszed"});
//         }
//         const { review, rating, jobId ,role} = req.body;
//      try{
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({ message: "Job not found" });
//         }
    
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
    
//         const reviewData = {
//             review,
//             rating,
//             user: req.user.id,
//             job: jobId,
//             role,
//             createdAt: Date.now(),
//         };
    
//         const newReview = await Review.create(reviewData);
    
//         // job.reviews.push(newReview._id);
//         // await job.save();
    
//         res.status(201).json(newReview);
//      }
//      catch(error){
//         console.log("Error in apply job + "+error.message);
//         return res.status(500).json({
//             message:"Internal Server Error",
//         })
//      }
//     });

const post_Review = asyncHandler(async (req, res) => {
    try {
        // Check if the user is authenticated
        const oidcUser = req.oidc.user;

        const user = await User.findOne({ auth0Id: oidcUser.sub });

        const isAuth=req.oidc.isAuthenticated() || user.email;

        if (!isAuth) {
            return res.status(401).json({ message: "Not Authorized" });
        }

        if (!oidcUser || !oidcUser.sub) {
            return res.status(401).json({ message: "Invalid User Session" });
        }

        // Fetch the user from the database using `auth0Id`
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { review, rating, jobId, role ,name } = req.body;

        // Validate input fields
        if (!review || !rating || !jobId || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Fetch the job from the database
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Create a new review
        const reviewData = {
            review,
            name,
            rating,
            user: user._id, // Link the review to the user
            job: jobId,
            role,
            createdAt: Date.now(),
        };

        const newReview = await Review.create(reviewData);

        res.status(201).json({ message: "Review created successfully", newReview });
    } catch (error) {
        console.error("Error in posting review: " + error.message);
        return res.status(500).json({
            message: "Internal Server Error ", 
            error: error.message,

        });
    }
});

const get_Review = asyncHandler(async (req, res) => {
    try {
        const reviews = await Review.find().populate("user", "name").populate("job", "title");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

const getReviewByUser=asyncHandler(async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        const review=await Review.find({user:user._id}).populate("user","name").sort({createdAt:-1});
        if(!review) {
            return res.status(404).json({message:"Review Not Found"});
        }
        return res.status(200).json(review);
    } catch (error) {
        console.log("Error in  fetching the review"+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})
const get_Review_ById = asyncHandler(async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }   
})
module.exports={post_Review,get_Review,getReviewByUser,get_Review_ById};