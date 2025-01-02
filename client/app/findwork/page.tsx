"use client"
import Header from '@/components/header'
import React,{useEffect,useState} from 'react'
import { usejobsContext } from '@/context/jobsContext'
import { useGlobalContext } from '@/context/globalContext'
import SearchForm from '@/components/SearchForm'
import Image from 'next/image'
import { grip, list, table } from "@/components/utils/Icons";
import JobCard from '@/components/JobItem/jobCard'
import {Job} from '@/types/types'
import Filters from '@/components/Filters'
const findWork = () => {
  const {likeJob,jobs,applyJob,filters}=usejobsContext();
  // const {userProfile,isAuthenticated}=useGlobalContext();
  // const [isLiked, setIsLiked] = useState(false);
  // const [isApplied, setIsApplied] = useState(false);  
  const [gridColumns, setGridColumns] = useState(3);
  //cylce thrugh 1,2,3 gridColumns
const toggleGridColumns=()=>{
  setGridColumns(gridColumns === 3 ? 2 : gridColumns === 2 ? 1 : 3);
}
const getIcon = () => {
  if (gridColumns === 3) return grip;
  if (gridColumns === 2) return table;
  return list;
};

const filtredJobs =
  filters.fullTime || filters.partTime || filters.contract || filters.internship
    ? jobs.filter((job: Job) => {
        if (filters.fullTime && job.jobType.includes("Full Time")) return true;
        if (filters.partTime && job.jobType.includes("Part Time")) return true;
        if (filters.contract && job.jobType.includes("Contract")) return true;
        if (filters.internship && job.jobType.includes("Internship")) return true;
        if (filters.fullStack && job.tags.includes("Full Stack")) return true;
        if (filters.backend && job.tags.includes("Backend")) return true;
        if (filters.devOps && job.tags.includes("DevOps")) return true;
        if (filters.uiUx && job.tags.includes("UI/UX")) return true;
        return false;
      })
    : jobs;



  return (
    <main>
      <Header/>
      <div className="relative px-16 bg-[#D7DEDC] overflow-hidden">
        <h1 className="py-8 text-black font-bold text-3xl">
          Find Your Next Job Here
        </h1>

        <div className="pb-8 relative z-10">
          <SearchForm />
        </div>
        <Image
          src="/wome_on_phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover"
        />

        <Image
          src="/teams.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover"
        />
      </div>
      <div className="w-[90%] mx-auto mb-14">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black py-8">Recent Jobs</h2>

          <button
            onClick={toggleGridColumns}
            className="flex items-center gap-4 border border-gray-400 px-8 py-2 rounded-full font-medium"
          >
            <span>
              {gridColumns === 3
                ? "Grid View"
                : gridColumns === 2
                ? "Table View"
                : "List View"}
            </span>
            <span className="text-lg">{getIcon()}</span>
          </button>
        </div>

        <div className="flex gap-8">
          <Filters />

          <div
            className={`self-start flex-1 grid gap-8 ${
              gridColumns === 3
                ? "grid-cols-3"
                : gridColumns === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {jobs.length > 0 ? (
              filtredJobs.map((job: Job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="mt-1 flex items-center">
                <p className="text-2xl font-bold">No Jobs Found!</p>
              </div>
            )}
          </div>
        </div>

        </div>  
    </main>
  )
}

export default findWork
