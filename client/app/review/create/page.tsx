"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usejobsContext } from "@/context/jobsContext";
import { useReviewContext } from "@/context/reviewContext";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Job } from "@/types/types";
import { useGlobalContext } from "@/context/globalContext";
const CreateReviewPage = () => {
    const { userProfile } = useGlobalContext();
  const { jobs } = usejobsContext(); // Get list of jobs
  const { post_Review } = useReviewContext(); // Get the review posting function
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [review, setreview] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<string>(""); // To store selected job's ID
  const router = useRouter();

  const hasAplliedforJob = (jobId: string): boolean => {
      const job = jobs.find((job: Job) => job._id === jobId);
      return job ? job.applicants.includes(userProfile._id) : false;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure jobId is selected
    if (!selectedJobId) {
      toast.error("Please select a job.");
      return;
    }
  if (!hasAplliedforJob(selectedJobId)) {
    toast.error("You have not applied for this job. You cant review it"); 
  }
  else{
    const reviewData = {
      name,
      role,
      review,
      rating,
      jobId: selectedJobId,
    };

    try {
      await post_Review(reviewData);
     // toast.success("Review Created Successfully");
      router.push("/review"); // Redirect after submission
    } catch (error) {
      toast.error("Error in creating review");
      console.log(error);
    }
}
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 border-gray-500 border-b py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        {/* <div className="w-fit h-fit border-2 border-blue-300"> */}
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create a Review</h1>
          <p className="mt-4 text-gray-500">
            We would love to hear your thoughts! Please fill out the form to share your review with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 " >
          {/* Name Field */}
          <div className="border-b border-gray-500">
            <label htmlFor="name" className="sr-only">Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-700 border-2 p-4 text-sm shadow-sm"
                placeholder="Your Name"
              />
            </div>
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="sr-only">Role</label>
            <div className="relative">
            <select
      id="role"
      aria-placeholder="Select Your Role"
      value={role}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
      className="w-full rounded-lg border-gray-700 p-4 text-sm shadow-sm"
    >
      <option value="" disabled>Select Your Role</option>
      <option value="Jobseeker">Jobseeker</option>
      <option value="Recruiter">Recruiter</option>
    </select>
            </div>
          </div>

          {/* Job Selection */}
          <div>
            <label htmlFor="job" className="sr-only">Job</label>
            <div className="relative">
              <select
                id="job"
                value={selectedJobId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedJobId(e.target.value)}
                className="w-full rounded-lg border-gray-700 p-4 text-sm shadow-sm"
              >
                <option value="">Select a Job</option>
                {jobs.map((job: Job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} {/* Update this to the appropriate job property */}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Review Field */}
          <div>
            <label htmlFor="review" className="sr-only">Review</label>
            <div className="relative">
              <textarea
                id="review"
                value={review}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setreview(e.target.value)}
                className="w-full rounded-lg border-gray-700 p-4 text-sm shadow-sm"
                rows={4}
                placeholder="Write your review here"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setRating(star)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17l-3.09 1.63a1 1 0 0 1-1.45-1.07L7.2 13.6l-4.55-4.44a1 1 0 0 1 .55-1.71l5.77-.84L12 2l2.58 5.23 5.77.84a1 1 0 0 1 .55 1.71l-4.55 4.44 1.69 5.95a1 1 0 0 1-1.45 1.07L12 17z"
                />
              </svg>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
            
      {/* Background Image */}
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Review Background"
          src="/asach.jpg" // Update to the appropriate path for the image
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default CreateReviewPage;
