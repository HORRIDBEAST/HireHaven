const User = require('../models/userModel');
const {Mistral} = require("@mistralai/mistralai");

const axios = require('axios');
const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
require('dotenv').config();

const mistral = new Mistral({
    apiKey: process.env.MISTRAL_AI_API_KEY, // Make sure to set this in your .env file
  });

const generateJobDescription = asyncHandler(async (req, res) => {
    try {
        const { title, employmentType, skills, tags, location, salary, prompt } = req.body;

        // Prepare data for Mistral AI
        const aiInput = {
            job_title: title,
            employment_type: employmentType,
            skills: skills,
            tags: tags,
            location: location.address || location.country || location.city,
            salary: salary,
            prompt: prompt
        };
        if (!process.env.MISTRAL_AI_API_KEY) {
            throw new Error("API_KEY is not defined in the environment variables.");
          }
        const response =await mistral.chat.complete(
            {
                model: 'mistral-small-latest',
                messages: [{ 
                    role: 'user', 
                    content: `Generate a job description based on the following details: Title: ${title}, Employment Type: ${employmentType}, Skills: ${skills.join(", ")}, Tags: ${tags.join(", ")}, Location: ${location.address || location.country || location.city}, Salary: ${salary}.
                    Generate in a  pointwise format, without any bullet points or symbols, and ensure clarity in each point` 
                  }], 
            },
            );
            res.status(200).json({ message: 'Job pointwise description generated successfully' , data:response.choices[0].message.content});

        } catch (error) {
            console.error('Error generating job description:', error);
            res.status(500).json({ error: 'Failed to generate job description' });
        }
    });
const createJob=asyncHandler(async(req,res)=>{
    try {
        const user=await User.findOne({auth0Id: req.oidc.user.sub});
        const isAuth=req.oidc.isAuthenticated() || user.email;

        if(!isAuth){
            return res.status(401).json({message:"Not Authuriszed"});
        }
        const {title,description,location,salary,jobType,tags,skills,salaryType,negotiable}=req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
          }
      
          if (!description) {
            return res.status(400).json({ message: "Description is required" });
          }
      
          if (!location) {
            return res.status(400).json({ message: "Location is required" });
          }
      
          if (!salary) {
            return res.status(400).json({ message: "Salary is required" });
          }
      
          if (!jobType) {
            return res.status(400).json({ message: "Job Type is required" });
          }
      
          if (!tags) {
            return res.status(400).json({ message: "Tags are required" });
          }
      
          if (!skills) {
            return res.status(400).json({ message: "Skills are required" });
          }
          
      const job=new Job({
        title,
        description,
        location,
        salary,
        jobType,
        tags,
        skills,
        salaryType,
        negotiable,
        createdBy:user._id,
        
      });
      await job.save();
          
        res.status(201).json({ message: "Job created successfully" });


    } catch (error) {
        console.log("Error in creating Job due to "+error.message);
        return res.status(500).json({
            message:"Server Error ok dear"
        })
    }
});
//get job
const getJob=asyncHandler(async(req,res)=>{
    try {
        const jobs=await Job.find({}).populate("createdBy","name email profilePicture").sort({createdAt:-1});
        if(!jobs) {
            return res.status(404).json({message:"Jobs Not Found"});
        }
        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in  fetching the jobs"+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})
const getJobByUser=asyncHandler(async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        const jobs=await Job.find({createdBy:user._id}).populate("createdBy","name email profilePicture").sort({createdAt:-1});
        if(!jobs) {
            return res.status(404).json({message:"Jobs Not Found"});
        }
        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in  fetching the jobs"+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})
const searchJobs=asyncHandler(async(req,res)=>{
    try {
       const {tags,location,jobType,skills,title}=req.query;
       let query={};
       if (tags) {
        query.tags = { $in: tags.split(",") };
      }
  
      if (location) {
        query.location = { $regex: location, $options: "i" };
      }
  
      if (title) {
        query.title = { $regex: title, $options: "i" };
      } 
      if (jobType) {
        query.jobType = { $regex: jobType, $options: "i" }; // Case-insensitive search
    }

    if (skills) {
        query.skills = { $in: skills.split(",") }; // Split skills into an array
    }
       const jobs=await Job.find(query).populate("createdBy","name email profilePicture").sort({createdAt:-1});
       if (jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found" });
    }

            return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in  fetching the jobs"+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})

const applyJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
        const user=await User.findOne({auth0Id: req.oidc.user.sub});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        if(job.applicants.includes(user._id)){
            return res.status(400).json({ message: "You have already applied for this job" });
        }
        else{
            job.applicants.push(user._id);
            await job.save();
            return res.status(200).json({ message: "Job applied successfully" });
        }
        
    } catch (error) {
        console.log(`Error in apply job + ${error.message}`);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})
const likeJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
        const user=await User.findOne({auth0Id: req.oidc.user.sub});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        const isLiked=job.likes.includes(user._id);
        if(isLiked){
            job.likes=job.likes.filter((id)=>id!==user._id);
        }    
        else{
            job.likes.push(user._id);
        }
        await job.save();
        return res.status(200).json({ message: "Job liked successfully" });
    } catch (error) {
        console.log("Error in apply job + "+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})

const getJobById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const job=await Job.findById(id).populate("createdBy","name email profilePicture");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
        return res.status(200).json(job);
    } catch (error) {
        console.log("Error in apply job + "+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
})
const deleteJob=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const job=await Job.findById(id);
        const user=await User.findOne({auth0Id: req.oidc.user.sub});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
          await job.deleteOne({
            _id: id,
          });
        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.log("Error in apply job + "+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
}})
module.exports={createJob,generateJobDescription,getJob,getJobByUser,searchJobs ,applyJob,likeJob,getJobById,deleteJob};