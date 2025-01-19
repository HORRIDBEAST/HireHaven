import React, { Children, useContext,createContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ReviewContext=createContext();


axios.defaults.baseURL = "http://localhost:7895/api";
axios.defaults.withCredentials = true;


export const ReviewContextProvider=({children})=>{
    const {userProfile,getUserProfile}=useGlobalContext();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
 

    useEffect(() => {
        getReview();
      }, []);
    const getReview=async()=>{
        setLoading(true);
        try {
            const response=await axios.get("/review");
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in getting review"+error.message);
            setLoading(false);
        }
    }
    const post_Review=async(review_data)=>{
        console.log(review_data);
        if (!review_data.review) {
            toast.error("Review cannot be empty");
            return;
        }
        if (!review_data.rating) {
            toast.error("Rating cannot be empty");
            return;
        }   
        if (!review_data.jobId) {
            toast.error("JobId cannot be empty");
            return;
        }
        if (!review_data.role) {
            toast.error("Role cannot be empty");
            return;
        }
        if (!review_data.name) {
            toast.error("Name cannot be empty");
            return;
        }
          
try {
    const res=await axios.post("/review",review_data);
    setReviews((pR)=>[res.data, ...pR]);
    toast.success("Review Posted Successfully");
    if(userProfile?.id){
        setUserReviews((uR)=>[res.data,...uR]);
        await getUserReviews(userProfile._id);
    }
    
} catch (error) {
    console.log("Error in creating review"+error.message);
}
    }

    const getUserReviews=async(id)=>{
        setLoading(true);
        try {
            const res=await axios.get(`/review/user/${id}`);
            setUserReviews(res.data);
            
        } catch (error) {
            console.log("Error in getting user jobs"+error.message);
        }finally{
            setLoading(false);
        }
    }
const getReview_ById=async(id)=>{
    setLoading(true);
    try {
        const res=await axios.get(`/review/${id}`);
        setLoading(false);
        return res.data;
    } catch (error) {
        console.log("Error in getting review by id"+error.message);
    }
}
    useEffect(() => {
        if (userProfile && userProfile._id) {
          getUserReviews(userProfile._id);
          getUserProfile(userProfile.auth0Id);
        }
      }, [userProfile._id])

      return(
        <ReviewContext.Provider value={{
            reviews,
            setReviews,
            userReviews,
            setUserReviews,
            post_Review,
            getUserReviews,
            getReview,
            getReview_ById,
        }
        }>
            {children}
        </ReviewContext.Provider>
      );
    }

      export const useReviewContext=()=>{
        return useContext(ReviewContext);
    }