 "use client";
import React,{useEffect, useState} from 'react'
import Header from '@/components/header'
import JobForm from '../../components/PostJob/jobForm'
import { useGlobalContext } from '../../context/globalContext'
import { useRouter } from 'next/navigation';
import { Job } from '@/types/types';
 const PostJobs = () => {
  const {userJobs,jobs}=useGlobalContext();
  const {isAuthenticated,loading,userProfile}=useGlobalContext();

  const userId=userProfile?._id;
  const router=useRouter();
  
  
    useEffect(() => {
        if (!loading && !isAuthenticated) {
          router.push("http://localhost:7895/login");
        }
      }, [isAuthenticated]);
   return (
    <div className="flex flex-col">
        <Header/>
        <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Post a Job/Role
      </h2>
      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">

        <JobForm/>
        </div>

     </div>
   )
 }
 
 export default PostJobs
 