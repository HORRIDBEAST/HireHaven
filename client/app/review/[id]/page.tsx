"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useReviewContext } from "../../../context/reviewContext";
//import { getReview_ById } from "../../context/reviewContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/types/types";
import { useParams } from "next/navigation";
const ReviewDetailPage = () => {
  const { reviews } = useReviewContext();
  const { id } = useParams(); // Dynamic route parameter
  const [review, setReview] = useState<Review|null>(null);
    const {getReview_ById} = useReviewContext();
  useEffect(() => {
    console.log("Routed is +",id);
    if(!id) return;
    
    const fetchReview = async () => {
        if (id && reviews.length > 0) {
          // Try finding the review from the state first
          const selectedReview = reviews.find((r: Review) => r._id === id);
          if (selectedReview) {
            setReview(selectedReview);
          } else {
            const fetchedReview = await getReview_ById(id);
            if (fetchedReview) {
              setReview(fetchedReview);
            } else {
              setReview(null);
            }
          }
        } else {
          // Directly fetch the review from the backend if reviews are empty
          const fetchedReview = await getReview_ById(id);
          if (fetchedReview) {
            setReview(fetchedReview);
          } else {
            setReview(null);
          }
        }
      };
  
      fetchReview();
    }, [id, reviews, getReview_ById]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-3.09 1.63a1 1 0 0 1-1.45-1.07L7.2 11.6l-4.55-4.44a1 1 0 0 1 .55-1.71l5.77-.84 2.58-5.23a1 1 0 0 1 1.9 0l2.58 5.23 5.77.84a1 1 0 0 1 .55 1.71l-4.55 4.44 1.69 5.95a1 1 0 0 1-1.45 1.07L10 15z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  if (!review) {
    return <p className="text-gray-500">Review not found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen p-6">
      {/* Heading Section */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Hi {review.name || review.user.name}. Here is your review
      </h1>
  
      {/* Review Details Section */}
      <div className="flex justify-center">
        <div className="flow-root rounded-lg border border-gray-300 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 w-3/5 animate-fade-in">
          <dl className="-my-3 divide-y divide-gray-300 text-sm dark:divide-gray-700">
            {/* Name */}
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 even:bg-blue-50 even:dark:bg-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{review.name || review.user.name}</dd>
            </div>
            {/* Role */}
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 even:bg-blue-50 even:dark:bg-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">Role</dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{review.role}</dd>
            </div>
            {/* Applied For */}
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 even:bg-blue-50 even:dark:bg-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">Applied For</dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{review.job?.title}</dd>
            </div>
            {/* Description */}
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 even:bg-blue-50 even:dark:bg-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">Description</dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{review.review}</dd>
            </div>
            {/* Rating */}
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 even:bg-blue-50 even:dark:bg-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">Rating</dt>
              <dd className="flex items-center sm:col-span-2">{renderStars(review.rating)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
  
};

export default ReviewDetailPage;
