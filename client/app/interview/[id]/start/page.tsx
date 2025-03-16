"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useInterviewContext } from "../../../../context/interviewContext";
import QuestionSections from "./_components/QuestionSections";
import { Interview, Question } from "@/types/types";
import { Loader2 } from "lucide-react";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = () => {
  const { getInterviewById } = useInterviewContext();
  const [interviewData, setInterviewData] = useState<Interview | null>(null);
  const [mockQuestions, setMockQuestions] = useState<Question[] | null>(null);
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]); // Track answered state
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      getInterviewData(params.id as string);
    }
  }, [params?.id]);

  useEffect(() => {
    if (mockQuestions) {
      setAnsweredQuestions(new Array(mockQuestions.length).fill(false)); // Initialize based on question count
    }
  }, [mockQuestions]);

  const getInterviewData = async (interviewId: string) => {
    try {
      const resp = await getInterviewById(interviewId);
      if (resp && resp.json_mock_response) {
        const jsonStartIndex = resp.json_mock_response.indexOf("[");
        const jsonEndIndex = resp.json_mock_response.lastIndexOf("]");
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          const jsonString = resp.json_mock_response.slice(jsonStartIndex, jsonEndIndex + 1).trim();
          try {
            const jsonResponse = JSON.parse(jsonString);
            setInterviewData(resp);
            setMockQuestions(jsonResponse);
          } catch (parseError) {
            console.error("JSON Parsing Error:", parseError, "Extracted JSON:", jsonString);
          }
        } else {
          console.error("No JSON found in response:", resp.json_mock_response);
        }
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  const handleAnswerSaved = (nextIndex: number) => {
    setAnsweredQuestions((prev) => {
      const updated = [...prev];
      updated[activeQIndex] = true; // Mark current question as answered
      return updated;
    });
    setActiveQIndex(nextIndex); // Move to next question
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-5 position-absolute overflow-hidden">
      <div className="max-w-8xl mx-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
              Interview Preparation
            </h1>
            <p className="text-purple-100 text-center max-w-2xl mx-auto">
              Practice your interview skills with our AI-powered mock interview system
            </p>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
            <div>
              {interviewData && mockQuestions ? (
                <QuestionSections
                  interviewData={interviewData}
                  mockQuestions={mockQuestions}
                  activeQIndex={activeQIndex}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-4" />
                  <p className="text-gray-600 text-lg">Preparing your interview questions...</p>
                </div>
              )}
            </div>

            <div>
              {mockQuestions && interviewData && (
                <RecordAnswer
                  mockQuestions={mockQuestions}
                  interviewData={interviewData}
                  activeQIndex={activeQIndex}
                  answeredQuestions={answeredQuestions}
                  onAnswerSaved={handleAnswerSaved}
                />
              )}
              <div className="mt-1 flex justify-end gap-1">
                {activeQIndex > 0 && (
                  <Button
                    className="bg-purple-500 rounded-full"
                    onClick={() => setActiveQIndex(activeQIndex - 1)}
                  >
                    Previous Question
                  </Button>
                )}
                {mockQuestions && activeQIndex < mockQuestions.length - 1 && (
                  <Button
                    className="bg-green-400 rounded-full"
                    onClick={() => setActiveQIndex(activeQIndex + 1)}
                  >
                    Next Question
                  </Button>
                )}
                {mockQuestions && activeQIndex === mockQuestions.length - 1 && (
                  <Link href={`/interview/${interviewData?.mockId}/feedback`}>
                    <Button className="bg-red-400 rounded-full">End Interview</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;