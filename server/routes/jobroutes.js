const express=require("express");
const { createJob, getJob ,getJobByUser,searchJobs,applyJob,likeJob,getJobById,deleteJob} = require("../controllers/jobController");
const protect = require("../middleware/protect");
const router=express.Router();

router.post("/jobs",protect ,createJob);
router.get("/jobs" ,getJob);
router.get("/jobs/user/:id" ,protect,getJobByUser );
//search job
router.get("/jobs/search" ,searchJobs);

//apply-job
router.put("/jobs/apply/:id" ,protect,applyJob);


//like job
router.put("/jobs/like/:id" ,protect,likeJob);

//get job by id
router.get("/jobs/:id" ,protect,getJobById);

//delete particullar job
router.delete("/jobs/:id" ,protect,deleteJob);


module.exports=router;
 