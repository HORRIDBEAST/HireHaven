const express = require("express");
const router = express.Router();
const {
  createAIInterview,
  getAllInterviews,
  getInterviewById,
  getInterviewByUser,
  SaveUserAnswer,
 GetInterviewFeedbackForQ,
  GetInterviewFeedback,
  // deleteInterview,
} = require("../controllers/InterviewCon");
const protect = require("../middleware/protect");

router.post("/interview",createAIInterview,protect);
router.get("/interview", getAllInterviews);
router.get("/interview/user",getInterviewByUser,protect);

router.get("/interview/:id", getInterviewById,protect);

router.post("/interview/answer",protect, SaveUserAnswer);
router.post("/interview/feedbackForQ",protect, GetInterviewFeedbackForQ);
router.get("/interview/feedback/:mockIdRef",protect, GetInterviewFeedback);
// router.delete("/interview/:id", deleteInterview,protect);

module.exports=router;



