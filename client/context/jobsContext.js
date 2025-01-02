import React, { Children, useContext,createContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const JobsContext=createContext();


axios.defaults.baseURL = "http://localhost:7895/api";
axios.defaults.withCredentials = true;
export const JobsContextProvider=({children})=>{
    const {userProfile,getUserProfile}=useGlobalContext();
    const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState([]);
    const [filters, setFilters] = useState({
        fullTime: false,
    partTime: false,
    internship: false,
    contract: false,
    fullStack: false,
    backend: false,
    devOps: false,
    uiux: false, 
    });
    const [minSalary, setMinSalary] = useState(3000);
    const [maxSalary, setMaxSalary] = useState(100000000);
  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    location: "",
    title: "",
    skills: "",
    jobType: "",
  });
 
const getJob=async()=>{
    setLoading(true);
    try {
        const res=await axios.get("/jobs");
        setJobs(res.data);
    } catch (error) {
        console.log("Error in getting jobs"+error.message);
    }
}
useEffect(()=>{
    getJob();
},[]);

const createJob=async(jobdata)=>{
    try {
        const res=await axios.post("/jobs",jobdata);
        setJobs((prevJobs) => [res.data, ...prevJobs]);
        toast.success("Job Created Successfully");
        if (userProfile._id) {
            setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs]);
            await getUserJobs(userProfile._id);
          }
          await getJob();
         // router.push()
    } catch (error) {
        console.log("Error in creating job"+error.message);
    }
}

const getUserJobs=async(id)=>{
    setLoading(true);
    try {
        const res=await axios.get(`/jobs/user/${id}`);
        setUserJobs(res.data);
        setLoading(false);
    } catch (error) {
        console.log("Error in getting user jobs"+error.message);
    }finally{
        setLoading(false);
    }
}
const searchJobs=async(query)=>{
    setLoading(true);
    try {
        const res=await axios.get(`/jobs/search?${query}`);
        setJobs(res.data);
        setLoading(false);
    } catch (error) {
        console.log("Error in searching jobs"+error.message);
        toast.error("Error in searching jobs");
    }finally{
        setLoading(false);
    }
}

const getJobById=async(id)=>{
    setLoading(true);
    try {
        const res=await axios.get(`/jobs/${id}`);
        return res.data;
        setLoading(false);
    } catch (error) {
        console.log("Error in getting job by id"+error.message);
        toast.error("Error in getting job by id");
    }finally{
        setLoading(false);
    }
}

const likeJob=async(id)=>{
    try {
        await axios.put(`/jobs/like/${id}`);
        toast.success("Job Liked Successfully");
        getJob();
    } catch (error) {
        console.log("Error in liking job"+error.message);
        toast.error("Error in liking job");
    }
}

const applyJob=async(id)=>{
    const job=jobs.find((job) => job._id === id);
    if(job && job.applicants.includes(userProfile._id)){
        return toast.error("You have already applied for this job");
        return;
    }
    try {
        await axios.put(`/jobs/apply/${id}`);
        toast.success("Job Applied Successfully");
        getJob();
    } catch (error) {
        console.log("Error in applying job"+error.message);
        toast.error("Error in applying job ",error.response.data.message);
    }
}
//const filters
const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
    }))
};

const handleSearchChange = (searchName, value) => {
     setSearchQuery((prevQuery) => (
         { ...prevQuery, [searchName]: value }
     ))
}
const deleteJob=async(id)=>{
    try {
        await axios.delete(`/jobs/${id}`);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        toast.success("Job Deleted Successfully");
        setUserJobs((prevUserJobs) => prevUserJobs.filter((job) => job._id !== id));
        getJob();
    } catch (error) {
        console.log("Error in deleting job"+error.message);
        toast.error("Error in deleting job");
    } 
}
useEffect(() => {
    if (userProfile && userProfile._id) {
      getUserJobs(userProfile._id);
      getUserProfile(userProfile.auth0Id);
    }
  }, [userProfile._id]);
    return(
    <JobsContext.Provider value={{
        jobs,
        loading,
        createJob,
        userJobs,
        searchJobs,
        getJobById,
        likeJob,
        applyJob,
        deleteJob,
        handleSearchChange,
        searchQuery,
        handleFilterChange,
        filters,
        
        minSalary,
        maxSalary,
        setMinSalary,
        setMaxSalary,
        setFilters,
        setSearchQuery
    }}>
        {children}
    </JobsContext.Provider>
    )
}

export const usejobsContext=()=>{
    return useContext(JobsContext);
}
