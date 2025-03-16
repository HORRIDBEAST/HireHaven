import React, { Children, useContext,createContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const interviewContext=createContext();

axios.defaults.baseURL = "http://localhost:7895/api";
axios.defaults.withCredentials = true;


export const InterviewContextProvider=({children})=>{
    const {userProfile,getUserProfile}=useGlobalContext();
    const router = useRouter();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInterviews, setUserInterviews] = useState([]);
    useEffect(() => {
        getInterviews();
      }, []);
    const getInterviews=async()=>{
        setLoading(true);
        try {
            const response=await axios.get("/interview");
            setInterviews(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in getting interviews"+error.message);
            setLoading(false);
        }
    }
    const post_Interview=async(interview_data)=>{
        try {
            const response=await axios.post("/interview",interview_data);
            toast.success("Interview Scheduled");
            return response.data;  //optional
        } catch (error) {
            console.log("Error in getting interviews"+error.message);
        }
    }
    // const deleteInterview = async (mockId) => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.delete(`/interview/${mockId}`);
    //       toast.success("Interview deleted successfully");
    //       // Update userInterviews by filtering out the deleted interview
    //       setUserInterviews((prev) => prev.filter((interview) => interview.mockId !== mockId));
    //       return response.data;
    //     } catch (error) {
    //       toast.error("Error deleting interview");
    //       console.log("Error in deleting interview: " + error.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    const getUserInterviews=async()=>{
        setLoading(true);
        try {
            const res=await axios.get(`/interview/user`);
            setUserInterviews(res.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in getting user interviews"+error.message);
        }finally{
            setLoading(false);
        }
    }
    const getInterviewById=async(id)=>{
        setLoading(true);
        try {
            const res=await axios.get(`/interview/${id}`);
            return res.data;
           
        } catch (error) {
            console.log("Error in getting interview by id"+error.message);
        }finally{
            setLoading(false);
        }

    }

    const getFeedbackForAnswer = async (question, correctAns, userAns) => {
        try {
          const response = await axios.post(
            "/interview/feedbackForQ",
            { question, correctAns, userAns },
            { withCredentials: true }
          );
          console.log("Feedback response:", response.data);
          return response.data; // { feedback: "...", rating: X }
        } catch (error) {
          console.error("Error fetching feedback:", error);
          toast.error("Failed to get AI feedback");
          return { feedback: "Unable to evaluate", rating: 0 }; // Fallback
        }
      };
    const saveUserAnswer = async (answerData) => {
        try {
            console.log(answerData);
            const { question, correctAns, userAns } = answerData;
           if(!question) return toast.error("Question is required");
           if(!correctAns) return toast.error("Correct Answer is required");
           if(!userAns) return toast.error("User Answer is required");
           const aiFeedback = await getFeedbackForAnswer(question, correctAns, userAns);

           const enrichedAnswerData = {
            ...answerData,
            feedback: aiFeedback.feedback,
            rating: aiFeedback.rating,
          };
            const response = await axios.post("/interview/answer", enrichedAnswerData);
            console.log(response);
            // toast.success("Answer saved successfully!");
            const data= await response.data;
            return data;
        } catch (error) {
            toast.error("Error saving answer.");
            console.error(error);
        }
    };

    
    return (
        <interviewContext.Provider value={{interviews,
            post_Interview,getUserInterviews,saveUserAnswer,userInterviews,getInterviewById,
        }}>{children}</interviewContext.Provider>
    )
}

export const useInterviewContext=()=>useContext(interviewContext);

