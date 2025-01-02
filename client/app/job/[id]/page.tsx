"use client";
import Header from '@/components/header'
import React, { use, useEffect } from 'react'
import { usejobsContext } from '@/context/jobsContext' 
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Job } from '@/types/types';
import JobCard from '@/components/JobItem/jobCard';
import Image from 'next/image';
import formatMoney from '@/components/utils/formatMoney';
import { useGlobalContext } from '@/context/globalContext';
import { formatDates } from '@/components/utils/formatDates';
import  {bookmark, bookmarkEmpty } from '@/components/utils/Icons';
import toast from 'react-hot-toast';
import Footer from '@/components/footer';
const page = () => {
    const params=useParams();
    const {id}=params;
    const { jobs, likeJob, applyJob } = usejobsContext();
    const [isLiked, setIsLiked] = React.useState(false);
    const { userProfile, isAuthenticated } = useGlobalContext();

  const [isApplied, setIsApplied] = React.useState(false);
    const job=jobs.find((job:Job)=>job._id===id);
    const otherJobs=jobs.filter((job:Job)=>job._id!==id);
    
    useEffect(() => {
      if (job) {
        // Set applied status when the job is found
        setIsApplied(job.applicants.includes(userProfile._id));
        // Set liked status when the job is found
        setIsLiked(job.likes.includes(userProfile._id));
      }
    }, [job, userProfile._id]); 
    if(!job){
      return <div>Job not found</div>
  }
    const {
        title,
        location,
        description,
        salary,
        createdBy,
        applicants,
        jobType,
        createdAt,
        salaryType,
        negotiable,
      } = job;
const { name, profilePicture } = createdBy;
const router=useRouter();
const handleLike = (id: string) => {
  setIsLiked((prev) => !prev);
  likeJob(id);
}

  // return (
  //   <div>
  //   <Header/>
  //   <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex flex-wrap gap-8">
  //       <div className="w-[26%] flex flex-col gap-8">
  //         <JobCard activeJob job={job} />

  //         {otherJobs.map((job: Job) => (
  //           <JobCard job={job} key={job._id} />
  //         ))}
  //       </div>
  //       <div className="md:flex-1 w-full bg-white p-6 rounded-md">
  //         <div className="flex flex-col gap-2">
  //           <div className="flex justify-between items-center flex-wrap">
  //           <div className="flex items-center gap-2">
  //               <div className="w-14 h-14 relative overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
  //                 <Image
  //                   src={profilePicture || "/avatar.png"}
  //                   alt={name || "User"}
  //                   width={45}
  //                   height={45}
  //                   className="rounded-md"
  //                 />
  //                 <div>
  //                   <p className='font-bold'>{name}</p>
  //                   <p className='text-sm'>Recruiter</p>
  //                 </div>
  //                 <button
  //               className={`text-2xl  ${
  //                 isLiked ? "text-[#7263f3]" : "text-gray-400"
  //               }`}
  //               onClick={() => {
  //                 isAuthenticated
  //                   ? handleLike(job._id)
  //                   : router.push("http:localhost:7895/login");
  //               }}
  //             >
  //               {isLiked ? bookmark : bookmarkEmpty}
  //             </button>
  //           </div>
            
  //           <h1 className="text-2xl font-semibold">{title}</h1>
  //           <div className="flex gap-4 items-center flex-wrap">
  //             <p className="text-gray-500">{location}</p>
  //           </div>
  //           <div className="mt-2  gap-4  items-center">
  //             <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
  //               <span className="text-sm">Salary</span>
  //               <span>
  //                 <span className="font-bold">
  //                   {formatMoney(salary, "Rs")}
  //                 </span>
  //                 <span className="font-medium text-gray-500 text-lg">
  //                   /
  //                   {salaryType
  //                     ? `${
  //                         salaryType === "Yearly"
  //                           ? "pa"
  //                           : salaryType === "Monthly"
  //                           ? "pcm"
  //                           : salaryType === "Weekly"
  //                           ? "pw"
  //                           : "ph"
  //                       }`
  //                     : ""}
  //                 </span>
  //               </span>
  //             </p>
  //             <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
  //               <span className="text-sm">Posted</span>
  //               <span className='font-bold'>{formatDates(createdAt)}</span>
  //             </p>
              
  //             <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
  //               <span className="text-sm">Applicants</span>
  //               <span className="font-bold">{applicants.length}</span>
  //             </p>
  //             <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
  //               <span className="text-sm">Job Type</span>
  //               <span className="font-bold">{jobType[0]}</span>
  //             </p>
  //           </div>
  //           <h2 className="font-bold text-2xl mt-2">Job Description</h2>
  //         </div>
  //         <div
  //           className="wysiwyg mt-2"
  //           dangerouslySetInnerHTML={{ __html: description }}
  //         ></div>
  //               </div>

  //               <div className="w-[26%] flex flex-col gap-8">
  //         <button
  //           className={`text-white py-4 rounded-full hover:bg-[#7263f3]/90 hover:text-white ${
  //             isApplied ? "bg-green-500" : "bg-[#7263f3]"
  //           }`}
  //           onClick={() => {
  //             if (isAuthenticated) {
  //               if (!isApplied) {
  //                 applyJob(job._id);
  //                 setIsApplied(true);
  //               } else {
  //                 toast.error("You have already applied to this job");
  //               }
  //             } else {
  //               router.push("http:localhost:7895/login");
  //             }
  //           }}
  //         >
  //           {isApplied ? "Applied" : "Apply Now"}
  //         </button>

  //         <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
  //           <h3 className="text-lg font-semibold">Other Information</h3>

  //           <div className="flex flex-col gap-2">
  //             <p>
  //               <span className="font-bold">Posted:</span>{" "}
  //               {formatDates(createdAt)}
  //             </p>

  //             <p>
  //               <span className="font-bold">Salary negotiable: </span>
  //               <span
  //                 className={`${
  //                   negotiable ? "text-green-500" : "text-red-500"
  //                 }`}
  //               >
  //                 {negotiable ? "Yes" : "No"}
  //               </span>
  //             </p>

  //             <p>
  //               <span className="font-bold">Location:</span> {location}
  //             </p>

  //             <p>
  //               <span className="font-bold">Job Type:</span> {jobType[0]}
  //             </p>
  //           </div>
  //         </div>
  //         <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
  //           <h3 className="text-lg font-semibold">Tags</h3>
  //           <p>Other relevant tags for the job position.</p>

  //           <div className="flex flex-wrap gap-4">
  //             {job.tags.map((tag: string, index: number) => (
  //               <span
  //                 key={index}
  //                 className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
  //               >
  //                 {tag}
  //               </span>
  //             ))}
  //           </div>
  //         </div>
  //         <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
  //           <h3 className="text-lg font-semibold">Skills</h3>
  //           <p>
  //             This is a full-time position. The successful candidate will be
  //             responsible for the following:
  //           </p>

  //           <div className="flex flex-wrap gap-4">
  //             {job.tags.map((tag: string, index: number) => (
  //               <span
  //                 key={index}
  //                 className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
  //               >
  //                 {tag}
  //               </span>
  //             ))}
  //           </div>
  //               </div>
  //               </div>
  //               </div>
  //       </div>
  //       </div>
  //     </div>
  // )
  return (
    <main>
    <Header />

    <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex gap-8">
      <div className="w-[26%] flex flex-col gap-8">
        <JobCard activeJob job={job} />

        {otherJobs.map((job: Job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>

      <div className="flex-1 bg-white p-6 rounded-md">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 relative overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
                <Image
                  src={profilePicture || "/user.png"}
                  alt={name || "User"}
                  width={45}
                  height={45}
                  className="rounded-md"
                />
              </div>

              <div>
                <p className="font-bold">{name}</p>
                <p className="text-sm">Recruiter</p>
              </div>
            </div>
            <button
              className={`text-2xl  ${
                isLiked ? "text-[#7263f3]" : "text-gray-400"
              }`}
              onClick={() => {
                isAuthenticated
                  ? handleLike(job._id)
                  : router.push("https://jobfindr-q1cl.onrender.com/login");
              }}
            >
              {isLiked ? bookmark : bookmarkEmpty}
            </button>
          </div>

          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex gap-4 items-center">
            <p className="text-gray-500">{location}</p>
          </div>

          <div className="mt-2 flex gap-4 justify-between items-center">
            <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
              <span className="text-sm">Salary</span>

              <span>
                <span className="font-bold">
                  {formatMoney(salary, "GBP")}
                </span>
                <span className="font-medium text-gray-500 text-lg">
                  /
                  {salaryType
                    ? `${
                        salaryType === "Yearly"
                          ? "pa"
                          : salaryType === "Monthly"
                          ? "pm"
                          : salaryType === "Weekly"
                          ? "pw"
                          : "ph"
                      }`
                    : ""}
                </span>
              </span>
            </p>

            <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
              <span className="text-sm">Posted</span>
              <span className="font-bold">{formatDates(createdAt)}</span>
            </p>

            <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
              <span className="text-sm">Applicants</span>
              <span className="font-bold">{applicants.length}</span>
            </p>

            <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
              <span className="text-sm">Job Type</span>
              <span className="font-bold">{jobType[0]}</span>
            </p>
          </div>

          <h2 className="font-bold text-2xl mt-2">Job Description</h2>
        </div>

        <div
          className="wysiwyg mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>

      <div className="w-[26%] flex flex-col gap-8">
        <button
          className={`text-white py-4 rounded-full hover:bg-[#7263f3]/90 hover:text-white ${
            isApplied ? "bg-green-500" : "bg-[#7263f3]"
          }`}
          onClick={() => {
            if (isAuthenticated) {
              if (!isApplied) {
                applyJob(job._id);
                setIsApplied(true);
              } else {
                toast.error("You have already applied to this job");
              }
            } else {
              router.push("https://jobfindr-q1cl.onrender.com/login");
            }
          }}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>

        <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
          <h3 className="text-lg font-semibold">Other Information</h3>

          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold">Posted:</span>{" "}
              {formatDates(createdAt)}
            </p>

            <p>
              <span className="font-bold">Salary negotiable: </span>
              <span
                className={`${
                  negotiable ? "text-green-500" : "text-red-500"
                }`}
              >
                {negotiable ? "Yes" : "No"}
              </span>
            </p>

            <p>
              <span className="font-bold">Location:</span> {location}
            </p>

            <p>
              <span className="font-bold">Job Type:</span> {jobType[0]}
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
          <h3 className="text-lg font-semibold">Tags</h3>
          <p>Other relevant tags for the job position.</p>

          <div className="flex flex-wrap gap-4">
            {job.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
          <h3 className="text-lg font-semibold">Skills</h3>
          <p>
            This is a full-time position. The successful candidate will be
            responsible for the following:
          </p>

          <div className="flex flex-wrap gap-4">
            {job.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
  )
}

export default page
