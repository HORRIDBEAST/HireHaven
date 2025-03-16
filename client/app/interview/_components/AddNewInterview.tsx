"use client";
import { useInterviewContext } from "@/context/interviewContext";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Dialog ,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const AddNewInterview = () => {
  
  const { userProfile } = useGlobalContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { post_Interview } = useInterviewContext();

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const interviewData = {
      jobtitle: jobPosition,
      jobdescription: jobDescription,
      jobexperience: yearsOfExperience,
      email: userProfile?.email, // Use email from userProfile
      name: userProfile?.name,
    };

    try {
     const response = await post_Interview(interviewData);
     console.log(response);
      setOpenDialog(false);
      const mockId=response?.interview.mockId ;

      if (!mockId) {
        throw new Error("Mock ID not found in response");
      }
      console.log(mockId);
      // toast.success("Interview Scheduled");
       router.push(`/interview/${mockId}`);
    } catch (error) {
      console.error("Error creating interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div>
     <div className='p-8 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
      <h2 className='font-bold text-lg' onClick={()=>setOpenDialog(true)}>+Add New Interview</h2>
     </div>
     <Dialog open={openDialog}>
  <DialogTrigger></DialogTrigger>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-lg'>What Job are you Interviewing?</DialogTitle>
      <DialogDescription>
      <form onSubmit={onSubmit}>
        <div>
            <h2 className=''>Add Details about the Job Details,and your Experience</h2>
            <div className='mt-7 my-2'>
                <label>Job Title/Role  </label>
                <Input placeholder="eg: Java Developer" required onChange={(e) => setJobPosition(e.target.value)}></Input>
            </div>
            <div className='my-3'>
                <label>Job Description / Tech Stack </label>
                <Textarea placeholder="eg: Java , Spring Boot , React" required onChange={(e) => setJobDescription(e.target.value)}/>
            </div>
            <div className='my-3'>
                <label>Years of Experience</label>
                <input
  placeholder="eg: 2"
  type="number"
  max="60"
  required
  onChange={(e) => setYearsOfExperience(e.target.value)}
  className="w-full p-2 border rounded"
/>            </div>
        </div>
        <div className='flex gap-5 justify-end'>
          <Button variant="destructive" onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ?
            <>
            <LoaderCircle className='animate-spin'/> 'Generating from AI' 
            </>: 'Start Interview'}
          
            </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> 

    </div>
  );
};

export default AddNewInterview;
