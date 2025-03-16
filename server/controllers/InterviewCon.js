const asyncHandler = require("express-async-handler");
const { Mistral } = require("@mistralai/mistralai");
const MockAi = require("../models/interview_Model");
const User = require("../models/userModel");
const UserAnswer=require("../models/userAnswerSchema")
require("dotenv").config();
const {v4 :uuidv4}=require("uuid")
const mistral = new Mistral({
    apiKey: process.env.MISTRAL_AI_API_KEY, // Make sure to set this in your .env file
});

const createAIInterview = asyncHandler(async (req, res) => {
  try {
    const oidcUser = req.oidc.user;

    const user = await User.findOne({ auth0Id: oidcUser.sub });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { jobtitle, jobdescription, jobexperience } = req.body;
    if (!jobtitle || !jobdescription || !jobexperience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Improved prompt to enforce strict JSON output
    const inputPrompt = `
      You are an AI interviewer. Generate exactly 5 interview questions with answers based on the following details:
      - Job Position: ${jobtitle}
      - Job Description: ${jobdescription}
      - Years of Experience: ${jobexperience}

      Return ONLY a valid JSON array of objects. Each object must have "question" and "answer" fields. Example:
      [
        {"question": "Question 1", "answer": "Answer 1"},
        {"question": "Question 2", "answer": "Answer 2"},
        {"question": "Question 3", "answer": "Answer 3"},
        {"question": "Question 4", "answer": "Answer 4"},
        {"question": "Question 5", "answer": "Answer 5"}
      ]
    `;
    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: inputPrompt }],
    });

    // Extract JSON from the response using regex
    const rawOutput = response.choices[0].message.content.trim();
    console.log("Raw Mistral response:", rawOutput); // Debug the raw output
    let jsonResponse;
    const jsonMatch = rawOutput.match(/\[[\s\S]*?\]/); // Match JSON array

    if (jsonMatch && jsonMatch[0]) {
      jsonResponse = jsonMatch[0].trim();
    } else {
      throw new Error("No valid JSON array found in Mistral response");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonResponse);
      if (!Array.isArray(parsedResponse) || parsedResponse.length !== 5) {
        throw new Error("Invalid number of questions in JSON response");
      }
    } catch (parseError) {
      console.error("Failed to parse Mistral response:", parseError);
      return res.status(500).json({
        message: "Failed to parse AI-generated interview questions",
        error: parseError.message,
        rawResponse: rawOutput, // Include raw response for debugging
      });
    }

    const mockId = uuidv4();
    const interview = new MockAi({
      name: user.name,
      jobtitle,
      jobdescription,
      jobexperience,
      json_mock_response: JSON.stringify(parsedResponse), // Ensure it's a string
      email: user.email,
      mockId,
    });
    await interview.save();

    res.status(201).json({
      message: "Interview created successfully",
      interview: interview.toObject(),
    });
  } catch (error) {
    console.error("Error in createAIInterview:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Failed to create Interview",
      error: error.message || "Unknown server error",
      rawResponse: error.rawResponse || "No response available", // Include raw response if available
    });
  }
});

  const getAllInterviews = asyncHandler(async (req, res) => {
    try {
      const interviews = await MockAi.find({}).sort({ createdAt: -1 });
      if (!interviews || interviews.length === 0) {
        return res.status(404).json({ message: "No interviews found" });
      }
      res.status(200).json(interviews);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      res.status(500).json({ error: "Failed to fetch interviews" });
    }
  });

  const getInterviewById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const interview = await MockAi.findOne({ mockId: id });
        if (!interview) {
          return res.status(404).json({ message: "Interview not found here" });
        }
        res.status(200).json(interview);    
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        res.status(500).json({ error: "Failed to fetch interview by ID" });
    }
  });
  const getInterviewByUser = asyncHandler(async (req, res) => {
    try {
      // Find the user by their auth0Id
      const user = await User.findOne({ auth0Id: req.oidc.user.sub });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find all interviews for the user using their email
      const interviews = await MockAi.find({ email: user.email }).sort({ createdAt: -1 });
      if (!interviews || interviews.length === 0) {
        return res.status(404).json({ message: `No interviews found for this user ${user.email}` });
      }
  
      // Return the interviews
      res.status(200).json(interviews);
    } catch (error) {
      console.error("Error fetching interviews by user:", error);
      res.status(500).json({ error: "Failed to fetch interviews by user" });
    }
  });
  const SaveUserAnswer = asyncHandler(async (req, res) => {
    console.log("Is Authenticated:", req.oidc.isAuthenticated());

    if (!req.oidc.isAuthenticated()) {
      console.log("Not visible");
      return res.status(401).json({ message: "Not good access" });
  }
    try{
      
        const { name, mockIdRef, question, correctAns, userAns, rating, feedback, userEmail } = req.body;
        
        // if(!name || !mockIdRef || !question || !correctAns || !userAns || !rating || !feedback || !userEmail){
        //     return res.status(401).json({ message: "All fields are required" });
        // }
        if(!name) return res.status(401).json({ message: "Name is required" });
        if(!mockIdRef) return res.status(401).json({ message: "Mock ID is required" });
        if(!question) return res.status(401).json({ message: "Question is required" });
        if(!correctAns) return res.status(401).json({ message: "Correct Answer is required" });
        if(!userAns) return res.status(401).json({ message: "User Answer is required" });
        if(!rating) return res.status(400).json({ message: "Rating is required" });
        if(!feedback) return res.status(401).json({ message: "Feedback is required" });
        if(!userEmail) return res.status(401).json({ message: "User Email is required" });
        console.log(req.body);
    
    const newUserAnswer = new UserAnswer({
        name,
        mockIdRef,
        question,
        correctAns,
        userAns,
        rating,
        feedback,
        userEmail,
      });
      await newUserAnswer.save();

      res.status(201).json({
        message: "User answer saved successfully",
        data: newUserAnswer,
      });

    }catch(error){
        console.error("Error saving user answer:", error);
        res.status(500).json({ error: "Failed to save user answer" });
    }});

    // const deleteInterview = asyncHandler(async (req, res) => {
    //   try {
    //     // Check if user is authenticated
    //     if (!req.oidc.isAuthenticated()) {
    //       return res.status(401).json({ message: "Not Authorized" });
    //     }
    
    //     const oidcUser = req.oidc.user;
    //     const user = await User.findOne({ auth0Id: oidcUser.sub });
    //     if (!user) {
    //       return res.status(404).json({ message: "User not found" });
    //     }
    
    //     const { id } = req.params; // mockId from the URL
    //     const interview = await MockAi.findOne({ mockId: id });
    
    //     if (!interview) {
    //       return res.status(404).json({ message: "Interview not found" });
    //     }
    
    //     // Ensure the user owns the interview
    //     if (interview.email !== user.email) {
    //       return res.status(403).json({ message: "You are not authorized to delete this interview" });
    //     }
    
    //     // Delete the interview
    //     await MockAi.deleteOne({ mockId: id });
    
    //     // Optionally, delete related user answers (if desired)
    //     await UserAnswer.deleteMany({ mockIdRef: id });
    
    //     res.status(200).json({ message: "Interview deleted successfully", mockId: id });
    //   } catch (error) {
    //     console.error("Error deleting interview:", error);
    //     res.status(500).json({ error: "Failed to delete interview" });
    //   }
    // });


    // const GetInterviewFeedbackForQ = asyncHandler(async (req, res) => {
    //   try {
    //     console.log("Request received at /interview/feedbackForQ");
    //     console.log("Is Authenticated:", req.oidc.isAuthenticated());
    //     if (!req.oidc.isAuthenticated()) {
    //       return res.status(401).json({ message: "Not authorized" });
    //     }
    
    //     const { question, correctAns, userAns } = req.body;
    //     if (!question || !correctAns || !userAns) {
    //       return res.status(400).json({ message: "Question, correct answer, and user answer are required" });
    //     }
    
    //     const prompt = `
    //       You are an AI interviewer. Evaluate the user's answer for the following interview question:
    //       Question: "${question}"
    //       Correct Answer: "${correctAns}"
    //       User's Answer: "${userAns}"
    //       Provide feedback (max 100 words) and a rating (0-10) based on accuracy, completeness, and clarity.
    //       Return the response in JSON format with "feedback" and "rating" fields.
    //     `;
    
    //     const response = await mistral.chat.complete({
    //       model: "mistral-small-latest",
    //       messages: [{ role: "user", content: prompt }],
    //     });
    
    //     const feedbackJson = JSON.parse(response.choices[0].message.content.trim());
    //     console.log("AI Feedback:", feedbackJson);
    
    //     res.status(200).json(feedbackJson);
    //   } catch (error) {
    //     console.error("Error generating feedback:", error);
    //     res.status(500).json({ error: "Failed to generate feedback" });
    //   }
    // });
    const GetInterviewFeedbackForQ = asyncHandler(async (req, res) => {
      try {
        console.log("Request received at /interview/feedbackForQ");
        console.log("Is Authenticated:", req.oidc.isAuthenticated());
    
        if (!req.oidc.isAuthenticated()) {
          return res.status(401).json({ message: "Not authorized" });
        }
    
        const { question, correctAns, userAns } = req.body;
        if (!question || !correctAns || !userAns) {
          return res.status(400).json({ message: "Question, correct answer, and user answer are required" });
        }
    
        // **Improved Prompt to Ensure JSON Output**
        const prompt = `
          You are an AI interviewer evaluating a user's answer.
          - Question: "${question}"
          - Correct Answer: "${correctAns}"
          - User's Answer: "${userAns}"
    
          Provide feedback (max 100 words) and a rating (0-10).
          **Return ONLY a valid JSON object** in this format:
    
          \`\`\`json
          {
            "feedback": "Your feedback here",
            "rating": "Your rating here"
          }
          \`\`\`
        `;
    
        const response = await mistral.chat.complete({
          model: "mistral-small-latest",
          messages: [{ role: "user", content: prompt }],
        });
    
        // **Fix: Extract JSON properly**
        const rawOutput = response.choices[0].message.content.trim();
        const jsonMatch = rawOutput.match(/```json\n([\s\S]*?)\n```/);
    
        if (!jsonMatch) {
          throw new Error("Mistral did not return JSON.");
        }
    
        const feedbackJson = JSON.parse(jsonMatch[1]); // Extract and parse JSON content
        console.log("AI Feedback:", feedbackJson);
    
        res.status(200).json(feedbackJson);
      } catch (error) {
        console.error("Error generating feedback:", error);
        res.status(500).json({ error: "Failed to generate feedback" });
      }
    });

    const GetInterviewFeedback = asyncHandler(async (req, res) => {
      try {
        const { mockIdRef } = req.params;
        console.log("Request received at /interview/feedback");
        if (!mockIdRef) {
          return res.status(400).json({ message: "Mock ID is required" });
        }
        const feedbackList = await UserAnswer.find({ mockIdRef }).sort({ _id: 1 }).exec();
        if (!feedbackList || feedbackList.length === 0) {
          return res.status(404).json({ message: "No feedback found for this interview" });
        }
        res.status(200).json(feedbackList);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback", details: error.message });
      }
    });
    
      module.exports={
        createAIInterview,
        getAllInterviews,
        getInterviewById,
        getInterviewByUser,
        SaveUserAnswer,
        GetInterviewFeedbackForQ,
        GetInterviewFeedback,
      };