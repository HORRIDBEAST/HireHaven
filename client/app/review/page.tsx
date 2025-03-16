"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useReviewContext } from "../../context/reviewContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Review } from "@/types/types";

const Page = () => {
  const { reviews, userReviews, post_Review } = useReviewContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateReview = () => {
    router.push("/review/create");
  };

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

  return (
    <div
      className="p-6 flex flex-col items-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Optional Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="mb-6 text-center flex justify-end items-center w-full">
          <h1 className="text-4xl font-bold mb-4 flex-grow text-center text-white">
            See All Reviews
          </h1>
          {/* <Button
            
            className="bg-purple-600 hover:bg-blue-600 text-white mr-4"
          >
            See my Reviews
          </Button> */}
          <Button
            onClick={handleCreateReview}
            className="bg-purple-600 hover:bg-blue-600 text-white"
          >
            Create New Review
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-200">Loading reviews...</p>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {reviews.map((r: Review) => (
              <Card
                key={r._id}
                className="cursor-pointer bg-gray-300 bg-opacity-50"
                onClick={() => router.push(`/review/${r._id}`)}
              >
                <CardHeader>
                  <div className="flex items-center">
                    <img
                      src={r.user?.profilePicture || "/placeholder-avatar.png"}
                      alt={r.user?.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <CardTitle className="text-lg font-bold hover:underline">
                      {r.name || r.user?.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-white font-bold text-lg">
                    Role: {r.role} <br /> Applied for {r.job?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{r.review}</p>
                  <div className="flex mt-2 items-center space-x-1">
                    Rating: {renderStars(r.rating)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-200">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
