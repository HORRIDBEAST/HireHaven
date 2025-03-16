import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Interview } from "@/types/types";
// import { useInterviewContext } from "@/context/interviewContext";
// Define props interface
interface InterviewItemCardProps {
  item: Interview;
}

const InterviewItemCard: React.FC<InterviewItemCardProps> = ({ item }) => {
  const router = useRouter();
//  const {deleteInterview}= useInterviewContext();
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="text-xl font-bold text-gray-700">{item?.jobtitle}</h2>
      <h2 className="text-sm font-bold text-blue-400">Experience: {item?.jobexperience} Years</h2>
      <h2 className="text-sm font-bold text-blue-400">Created By: {item?.name}</h2>
      <div className="flex justify-around gap-2 my-3">
        <Button
          onClick={() => router.push(`/interview/${item?.mockId}`)}
          variant="default"
          size="sm"
        >
          Start
        </Button>
        <Button variant="destructive" size="sm" className="" onClick={()=>router.push(`/interview/${item?.mockId}/feedback`)}>Feedback</Button>

        {/* <Button variant="destructive" onClick={deleteInterview(item?.mockId)}>Delete</Button> */}
      </div>
    </div>
  );
};

export default InterviewItemCard;
