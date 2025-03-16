"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { useInterviewContext } from "@/context/interviewContext";
import InterviewItemCard from "./InterviewItemCard";
import { Interview } from "@/types/types";
import { motion } from "framer-motion";

const InterviewList: React.FC = () => {
  const router = useRouter();
  const { userProfile, getUserProfile } = useGlobalContext();
  const { interviews, setInterviews,getInterviews } = useInterviewContext();
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Interviews</h1>
      {interviews && interviews.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {interviews.map((interview: Interview, index: number) => (
            <motion.div key={index} variants={item}>
              <InterviewItemCard item={interview} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">No interviews found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;