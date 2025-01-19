const express=require("express");
const { post_Review, get_Review,getReviewByUser ,get_Review_ById} = require("../controllers/reviewController");
const protect = require("../middleware/protect");

const router=express.Router();

//post your review
router.post("/review",protect,post_Review);

//get all reviews
router.get("/review",get_Review);
//get review by user
router.get("/review/user/:id" ,protect,getReviewByUser );
//get review by id
router.get("/review/:id" ,protect,get_Review_ById);

module.exports=router;

