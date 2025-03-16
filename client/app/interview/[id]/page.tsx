"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useInterviewContext } from "@/context/interviewContext";
import { Interview as MyIntObject } from "@/types/types";

const Interview = () => {
  const params = useParams();
  const [interviewData, setInterviewData] = useState<MyIntObject | null>(null);
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const { getInterviewById } = useInterviewContext();

  useEffect(() => {
    const id = params?.id as string;
    console.log(params?.id);
    getInterviewData(params?.id as string);
  }, [params?.id]);

  const getInterviewData = async (interviewId: string) => {
    try {
      const resp = await getInterviewById(interviewId);
      console.log("The response is:-", resp);
      if (resp) {
        setInterviewData(resp);
      }
    } catch (error) {
      console.log("Error:- " + error);
    }
  };
  if (!params?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Interview ID</h2>
        </div>
      </div>
    );
  }
  if (!interviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Loading interview data...</h2>
          <div className="loader mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-10 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 tracking-tight mb-4">
          Let’s start the Interview
        </h2>
        <p className="text-lg text-gray-600">
          Prepare yourself for an engaging experience.
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Webcam Section */}
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-white p-6">
          <div className="w-full h-64 flex items-center justify-center relative">
            {webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <>
                <WebcamIcon className="h-32 w-32 text-gray-400 opacity-50" />
                <Button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setWebcamEnabled(true)}
                >
                  Enable Webcam & Start
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Job Details Section */}
        <div className="flex flex-col gap-6">
          {/* Job Information Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h3>
            <ul className="space-y-2">
              <li>
                <strong className="text-gray-700">Job Role:</strong>{" "}
                <span className="text-gray-600">{interviewData.jobtitle}</span>
              </li>
              <li>
                <strong className="text-gray-700">Job Description:</strong>{" "}
                <span className="text-gray-600">{interviewData.jobdescription}</span>
              </li>
              <li>
                <strong className="text-gray-700">Job Experience:</strong>{" "}
                <span className="text-gray-600">{interviewData.jobexperience}</span>
              </li>
            </ul>
          </div>

          {/* Information Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Lightbulb className="h-6 w-6" />
              Important Information
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              lacinia velit vel nisi consequat, nec malesuada nunc efficitur.
              Nulla facilisi. Sed in tortor euismod, cursus mi sed, ultrices
              sapien.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="flex justify-end mt-10">
        <Link href={`/interview/${params.id}/start`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;