"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGlobalContext } from "../../context/globalContext";

const JobSalary = () => {
  const { salary, handleSalaryChange, negotiable, setNegotiable, setSalaryType } = useGlobalContext();
    
  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="relative grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-black font-bold">Salary</h3>
          <Label htmlFor="salary" className="text-gray-500 mt-2">
            Enter the salary range for the job.
          </Label>
        </div>

        <div>
          <Input
            type="number"
            id="salary"
            placeholder="Enter Salary"
            value={salary}
            onChange={handleSalaryChange}
            className="mt-2"
          />

          <div className="flex gap-2 mt-2 justify-between">
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <Checkbox id="negotiable" />
              <Label htmlFor="negotiable" className="text-gray-500">
                Negotiable
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <Checkbox
                id="hideSalary"
                checked={negotiable}
                onCheckedChange={setNegotiable}
              />
              <Label htmlFor="hideSalary" className="text-gray-500">
                Hide Salary
              </Label>
            </div>

            <div>
              <Select onValueChange={setSalaryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="w-[120px] mt-2">
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Hourly">Hour</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSalary;
