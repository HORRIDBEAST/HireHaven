"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import axios from "axios";

interface UserAnswer {
  _id: string;
  name: string;
  mockIdRef: string;
  question: string;
  correctAns: string;
  userAns: string;
  feedback: string;
  rating: number;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const Feedback = () => {
  const { userProfile } = useGlobalContext();
  const router = useRouter();
  const params = useParams();
  const [feedbackList, setFeedbackList] = useState<UserAnswer[]>([]);

  const getFeedback = async () => {
    try {
      const response = await axios.get(`/interview/feedback/${params.id}`, {
        withCredentials: true,
      });
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    if (params.id) {
      getFeedback();
    }
  }, [params.id]);

  const totalRating =
    feedbackList.length > 0
      ? feedbackList.reduce((sum, item) => sum + item.rating, 0) / feedbackList.length
      : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl"
    >
      {feedbackList.length === 0 ? (
        <h2 className="text-red-500 text-2xl font-bold text-center">
          No Interview Record Found
        </h2>
      ) : (
        <>
          <h1 className="text-4xl font-serif font-bold text-gray-800 dark:text-white text-center mb-2">
            🎉 Congrats, {userProfile?.name || "User"}!
          </h1>
          <h2 className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Here's your Interview Feedback
          </h2>
          <p className="text-center text-lg text-blue-600 dark:text-blue-400 font-semibold mt-3">
            Your Overall Rating: {totalRating.toFixed(2)} ⭐
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="mt-5 space-y-4"
          >
            {feedbackList.map((item) => (
              <div key={item._id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-5 shadow-sm bg-gray-50 dark:bg-gray-800">
                <Collapsible>
                  <CollapsibleTrigger className="p-3 bg-blue-500 dark:bg-blue-700 text-white rounded-lg w-full text-left font-semibold transition hover:bg-blue-600">
                    {item.question}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 border-l-4 border-yellow-500 pl-3">
                      <strong className="text-yellow-600 dark:text-yellow-400">Rating:</strong> {item.rating} ⭐
                    </p>
                    <p className="text-sm bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 p-2 rounded-lg">
                      <strong>Your Answer:</strong> {item.userAns}
                    </p>
                    <p className="text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-2 rounded-lg">
                      <strong>Correct Answer:</strong> {item.correctAns}
                    </p>
                    <p className="text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 p-2 rounded-lg">
                      <strong>Feedback:</strong> {item.feedback}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </motion.div>
        </>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-center mt-6"
      >
        <Button 
          className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-900 dark:hover:bg-gray-600 transition"
          onClick={() => router.push("/interview")}
        >
          Go Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Feedback;
