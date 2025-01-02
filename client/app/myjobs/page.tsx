"use client";
import React ,{useEffect}from 'react'
import { useGlobalContext } from '@/context/globalContext';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/types';
import Header from '@/components/header';
import MyJob from '@/components/JobItem/MyJob';
import Footer from '@/components/footer';
import { usejobsContext } from '@/context/jobsContext';
const myJobs = () => {
  const {userJobs,jobs}=usejobsContext();
  const {isAuthenticated,loading,userProfile}=useGlobalContext();
  const [activeTab, setActiveTab] = React.useState("posts");
  const userId=userProfile?._id;
  const router=useRouter();
  
  
    // Redirect to login if not authenticated
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("http://localhost:7895/login");
      }
    }, [isAuthenticated]);
    const likedJobs = (jobs || []).filter((job:Job) => {
      console.log(job);
      return job.likes.includes(userId);
     });
     const appliedJobs = (jobs || []).filter((job: Job) => job.applicants.includes(userId));

     if (loading) {
      return null;
    }
  return (
    <div>
      <Header/>
      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <div className="self-center flex items-center gap-6">
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
          ${
            activeTab === "posts"
              ? "border-transparent bg-[#7263F3] text-white"
              : "border-gray-400"
          }`}
            onClick={() => setActiveTab("posts")}
          >
            My Job Posts
          </button>
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
          ${
            activeTab === "likes"
              ? "border-transparent bg-[#7263F3] text-white"
              : "border-gray-400"
          }`}
            onClick={() => setActiveTab("likes")}
          >
            Liked Jobs
          </button>
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium ${
              activeTab === "applied"
                ? "border-transparent bg-[#7263F3] text-white"
                : "border-gray-400"
            }`}
            onClick={() => setActiveTab("applied")}
          >
            Applied Jobs
          </button>
        </div>

        {activeTab === "posts" && (userJobs && userJobs.length === 0) && (
  <div className="mt-8 flex items-center">
    <p className="text-2xl font-bold">No job posts found.</p>
  </div>
)}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No liked jobs found.</p>
          </div>
        )}

{activeTab === "applied" && appliedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No applied jobs found.</p>
          </div>
        )}
<div className="my-8 grid grid-cols-2 gap-6">
  {activeTab === "posts" &&
    (userJobs?.map((job: Job) => <MyJob key={job._id} job={job} />) || <p>No jobs found</p>)}

  {activeTab === "likes" &&
    (likedJobs?.map((job: Job) => <MyJob key={job._id} job={job} />) || <p>No jobs liked</p>)}
    {activeTab === "applied" &&
            (appliedJobs?.map((job: Job) => <MyJob key={job._id} job={job} />) || <p>No jobs applied</p>)}
</div>
      </div>

      <Footer />
    </div>
  )
}

export default myJobs
