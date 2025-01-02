"use client"
import React, { useState } from "react";
import { useGlobalContext } from "@/context/globalContext";
import JobAbout from "./jobAbout";
import JobDetails from "./jobDetails";
import JobSkills from "./jobSkills";
import JobLocation from "./jobLocation";
import JobSalary from "./jobSalary";
import JobSummary from "./jobSummary";
import { usejobsContext } from "@/context/jobsContext";

const JobForm = () => {
    const sections = ["About","Job Details",  "Skills", "Location", "Salary","Summary"];
    const [activeSection, setActiveSection] = useState("About");
    const {
        jobTitle,
        jobDescription,
        salaryType,
        activeEmploymentTypes,
        salary,
        location,
        skills,
        negotiable,
        tags,
        resetJobForm,
      } = useGlobalContext();
      const {createJob}=usejobsContext();
    const handleSectionClick = (section:string) => {
      setActiveSection(section);
    }
    const getCompletedColor = (section: string) => {
        switch (section) {
            case "About":
              return jobTitle && activeEmploymentTypes.length > 0 ? "bg-[#7263F3] text-white text-white" : "bg-gray-300";
            case "Job Details":
              return jobDescription  && salary>0 ? "bg-[#7263F3] text-white text-white" : "bg-gray-300";
            case "Skills":
              return skills.length  && tags.length>0? "bg-[#7263F3] text-white" : "bg-gray-300";
            case "Location":
              return location.address || location.country || location.city ? "bg-[#7263F3] text-white" : "bg-gray-300";
            case "Salary":
              return salary ? "bg-[#7263F3] text-white" : "bg-gray-300";
            case "Summary":
              return  "bg-[#7263F3] text-white" ;
            default:
              return "";
        }
      }
        const renderStages=()=>{
            switch(activeSection){
                case "About":
                    return <JobAbout/>
                case "Job Details":
                    return <JobDetails/>
                case "Skills":
                    return <JobSkills/>
                case "Location":
                    return <JobLocation/>
                case "Salary":
                    return <JobSalary/>
                case "Summary":
                    return <JobSummary/>
            }
        }
        const propObject={
          title: jobTitle,
              description: jobDescription,
              salaryType,
              jobType: activeEmploymentTypes,
              salary,
              location: `${location.address || ""}, ${location.city || ""}, ${location.country || ""}`.trim().replace(/^,|,$/, ""),
              skills,
              negotiable,
              tags
        }
       /* const prompttoSubmit=()=>{
          title: jobTitle, 
          salaryType,
          jobType: activeEmploymentTypes,
          salary,
          location: `${location.address || ""}, ${location.city || ""}, ${location.country || ""}`.trim().replace(/^,|,$/, ""),
          skills,
          negotiable,
          tags

        }
          */
        const handleSubmit=(e:React.FormEvent)=>{
            e.preventDefault();
            createJob(propObject);
            resetJobForm();
        };
        return (
          <div className="w-full flex gap-6">
            <div className="self-start w-[10rem] flex flex-col bg-white rounded-md shadow-sm overflow-hidden">
              {sections.map((section, index) => (
                <button
                  key={index}
                  className={`pl-4 py-3 relative flex self-start items-center gap-2 font-medium 
                      ${
                        activeSection === section
                          ? "text-[#7263F3]"
                          : "text-gray-500"
                      }
                      `}
                  onClick={() => handleSectionClick(section)}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center border border-gray-400/60 justify-center text-gray-500
                      ${
                        activeSection === section ? " text-white" : ""
                      } ${getCompletedColor(section)}`}
                  >
                    {index + 1}
                  </span>
                  {section}
                  {activeSection === section && (
                    <span className="w-1 h-full absolute left-0 top-0 bg-[#7263F3] rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
      
            <form
              action=""
              className="p-6 flex-1 bg-white rounded-lg self-start"
              onSubmit={handleSubmit}
            >
              {renderStages()}
      
              <div className="flex justify-end gap-4 mt-4">
                {activeSection !== "Summary" && (
                  <button
                    type="button"
                    className="px-6 py-2 bg-[#7263F3] text-white rounded-md"
                    onClick={() => {
                      const currentIndex = sections.indexOf(activeSection);
      
                      setActiveSection(sections[currentIndex + 1]);
                    }}
                  >
                    Next
                  </button>
                )}
      
                {activeSection === "Summary" && (
                  <button
                    type="submit"
                    className="self-end px-6 py-2 bg-[#7263F3] text-white rounded-md"
                  >
                    Post Job
                  </button>
                )}
              </div>
            </form>
          </div>
        );
}


export default JobForm;
