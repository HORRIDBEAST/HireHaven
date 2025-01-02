"use client";

import { Job } from "@/types/types";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { Calendar, Bookmark, Heart } from "lucide-react";
import { Separator } from "../ui/separator";
import formatMoney from "../utils/formatMoney";
import { formatDates } from "../utils/formatDates";
import Image from "next/image";
import { bookmarkEmpty, bookmark } from "../utils/Icons";
import { usejobsContext } from "@/context/jobsContext";
interface jobInterface{
    job:Job,
    activeJob?:boolean,
}

const jobCard = ({job, activeJob}:jobInterface) => {
    const {
        title,
        salaryType,
        salary,
        createdBy,
        applicants,
        jobType,
        createdAt,
        location,
      } = job;
    
      const { name, profilePicture } = createdBy;
      const [isLiked, setIsLiked] = React.useState(false);

      const router = useRouter();
    
    const {likeJob}=usejobsContext();
const {userProfile,isAuthenticated}=useGlobalContext();
const companyDescription =
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.";
const jobTypeBg = (type: string) => {
    switch (type) {
      case "Full Time":
        return "bg-green-500/20 text-green-600";
      case "Part Time":
        return "bg-purple-500/20 text-purple-600";
      case "Contract":
        return "bg-red-500/20 text-red-600";
      case "Internship":
        return "bg-indigo-500/20 text-indigo-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };
const HandleLike=async(id:string)=>{
    setIsLiked((prev)=> !prev);
    likeJob(id);
}
useEffect(() => {
  setIsLiked(job.likes.includes(userProfile._id));
},[job.likes,userProfile._id])
  return (
    <div
    className={`p-8 rounded-xl flex flex-col gap-5
  ${
    activeJob
      ? "bg-gray-50 shadow-md border-b-2 border-[#7263f3]"
      : "bg-white"
  }`}
  >
    <div className="flex justify-between">
      <div
        className="group flex gap-1 items-center cursor-pointer"
        onClick={() => router.push(`/job/${job._id}`)}
      >
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
          <Image
            src={profilePicture || "/avatar.png"}
            alt={name || "User"}
            width={40}
            height={40}
            className="rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="group-hover:underline font-bold">{title}</h4>
          <p className="text-xs">
            {name}: {applicants.length}{" "}
            {applicants.length > 1 ? "Applicants" : "Applicant"}
            
          </p>
        </div>
      </div>

      <button
        className={`text-2xl ${
          isLiked ? "text-[#7263f3]" : "text-gray-400"
        } `}
        onClick={() => {
          isAuthenticated
            ? HandleLike(job._id)
            : router.push("http://localhost:7895/login");
        }}
      >
        {isLiked ? bookmark : bookmarkEmpty}
      </button>
    </div>

    <div className="flex items-center gap-2">
      {jobType.map((type, index) => (
        <span
          key={index}
          className={`py-1 px-3 text-xs font-medium rounded-md border ${jobTypeBg(
            type
          )}`}
        >
          {type}
        </span>
      ))}
    </div>

    <p>
      {companyDescription.length > 100
        ? `${companyDescription.substring(0, 100)}...`
        : companyDescription}
    </p>
        
    <Separator />

    <div className="flex justify-between items-center gap-6">
      <p>
        <span className="font-bold">{formatMoney(salary, "Rs")}</span>
        <span className="font-medium text-gray-400 text-lg">
          /
          {salaryType === "Yearly"
            ? "pa"
            : salaryType === "Monthly"
            ? "pm"
            : salaryType === "Weekly"
            ? "pw"
            : "ph"}
        </span>
      </p>

      <p className="flex items-center gap-2 text-sm text-gray-400">
        <span className="text-lg">
          <Calendar size={16} />
        </span>
        Posted: {formatDates(createdAt)}
      </p>
    </div>
  </div>
  )
}

export default jobCard
