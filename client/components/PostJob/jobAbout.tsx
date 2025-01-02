"use client";
import { useGlobalContext } from '@/context/globalContext';
import React ,{useEffect,useState} from 'react'
import  { Separator } from "@/components/ui/separator"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
interface EmploymentTypes{
    "Full Time":boolean,
    "Part Time":boolean,
    Internship :boolean,
    Contract:boolean,
    Temporary:boolean,
    Volunteer:boolean,

}
const JobAbout = () => {
    const {handleTitleChange,activeEmploymentTypes,setActiveEmploymentTypes,jobTitle}=useGlobalContext();
    const [employmentTypes, setEmploymentTypes] = useState<EmploymentTypes>({
        "Full Time": false,
        "Part Time": false,
        Internship: false,
        Contract: false,
        Temporary: false,
        Volunteer: false,
    })
    const handleEmploymentTypeChange = (type: keyof EmploymentTypes) => {
        setEmploymentTypes((prev)=>({
            ...prev,
            [type]: !prev[type]
        }))
    }
    useEffect(() => {
        const selectedTypes = Object.keys(employmentTypes).filter((type) => {
          return employmentTypes[type as keyof EmploymentTypes];
        });
    
        setActiveEmploymentTypes(selectedTypes);
      }, [employmentTypes]);
  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex-1">
<h3 className="text-lg font-semibold">Job Title</h3>
<Label
            htmlFor="jobTitle"
            className="text-sm text-muted-foreground mt-2"
          >
            A job title is a specific designation of a post in an organization.
          </Label>
</div>
<Input type="text" id="jobTitle" className="flex-1" value={jobTitle} onChange={(e)=>handleTitleChange(e)} placeholder='Enter the Job Title' >
</Input>
</div>
        <Separator/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className='flex-1'>
          <h3>Employment Type</h3>  
          <Label
            htmlFor="EmploymentType"
            className='' >
                Select the Type of Emplyment
            </Label>
        
        </div>
        <div className="flex-1 flex flex-col gap-2">
        {Object.entries(employmentTypes).map(([type, checked]) => (
            <div
              key={type}
              className="flex items-center space-x-2 border border-input rounded-md p-2"
            >
<Checkbox
                id={type}
                checked={checked}
                onCheckedChange={() => {
                  handleEmploymentTypeChange(
                    type as keyof EmploymentTypes 
                  );
                }}
              />
               <Label
                htmlFor={type}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
    </div>
      </div>
   
  )
}
export default JobAbout;
