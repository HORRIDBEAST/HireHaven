"use client";
import React from 'react'
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useGlobalContext } from '../../context/globalContext';
import axios from 'axios';
import toast from 'react-hot-toast';
const MyEditor=()=>{
  const {jobDescription,setJobDescription}=useGlobalContext();
  return (
    <ReactQuill
      value={jobDescription}
      onChange={setJobDescription}
      theme="snow"
      style={{
        minHeight: "400px",
        maxHeight: "900px",
      }}
      modules={{
        toolbar: true,
      }}
      className='custom quill-editor'/>
  )

}
const JobDetails = () => {
  const { jobTitle, activeEmploymentTypes, skills, tags, location, salary, setJobDescription } = useGlobalContext();

  const handleAIJobDescription = async () => {
   // console.log( jobTitle, activeEmploymentTypes, skills, tags, location, salary );

    try {
      const res = await axios.post('/jobs/generate-description', {
        title: jobTitle,
        employmentType: activeEmploymentTypes,
        skills: skills,
        tags: tags,
        location: location,
        salary: salary,
        prompt: "Create a job description for the given details"
      });
      console.log(res.data);
      console.log(res.data.data);
     // console.log(res.data.response);
      console.log(location.address || location.country || location.city);
      if (res.data.data) {
        setJobDescription(res.data.data);
        toast.success('Job description generated successfully');
      } else {
        alert('Unable to generate job description');
      }
    } catch (error) {
      alert(`Error generating job description:  ${error}`);
      //('Failed to generate job description');
    }
  };
  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-black font-bold">Job Description</h3>
          <Label htmlFor="jobDescription" className="text-gray-500 mt-2">
            Provide a detailed description of the job.
          </Label>
        </div>
        <button type="button" onClick={handleAIJobDescription} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Use AI to create job description
          </button>
          {/* {jobDescription && <div><h2>Generated Job Description:</h2><p>{jobDescription}</p></div>} */}
          
        <div className="flex-1">
          <MyEditor />
        </div>
      </div>

      <Separator className="my-2" />
    </div>
  );
}
  

export default JobDetails
