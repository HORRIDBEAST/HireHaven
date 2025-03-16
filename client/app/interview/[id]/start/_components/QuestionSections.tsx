import { Lightbulb, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { QuestionSectionsProps } from '@/types/types';

const QuestionSections: React.FC<QuestionSectionsProps> = ({
    interviewData,
    mockQuestions,
    activeQIndex,
}) => {
    const textToSpeech = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Speech Synthesis Not Supported');
        }
    };

    return mockQuestions && (
        <div className="space-y-6 border-2 border-blue-100 rounded-lg p-6 w-full md:w-3/4 overflow-hidden">
            {/* Question Navigation */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-3 min-w-max px-1">
                    {mockQuestions.map((_, index) => (
                        <button
                            key={index}
                            className={`
                                flex items-center justify-center px-4 py-2 rounded-full
                                transition-all duration-300 ease-in-out
                                ${activeQIndex === index
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                                }
                                font-medium text-sm
                            `}
                        >
                            Question{index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Question */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Question {activeQIndex + 1}
                    </h2>
                    <div className="flex gap-4">
                        <button
                            className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-colors"
                            disabled={activeQIndex === 0}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-colors"
                            disabled={activeQIndex === mockQuestions.length - 1}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                {mockQuestions[activeQIndex]?.question}
                            </p>
                        </div>
                        <button
                            onClick={() => textToSpeech(mockQuestions[activeQIndex]?.question)}
                            className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                            title="Listen to question"
                        >
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-xl text-blue-800">Pro Tips</h3>
                    </div>
                    <ul className="space-y-2 text-blue-700">
                        <li className="flex items-start gap-2">
                            <span className="block w-1 h-1 mt-2 rounded-full bg-blue-400" />
                            <p className="flex-1 text-md  leading-relaxed">
                                Take a moment to structure your thoughts before answering
                            </p>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="block w-1 h-1 mt-2 rounded-full bg-blue-400" />
                            <p className="flex-1 text-md leading-relaxed">
                                Use specific examples from your experience to support your answer
                            </p>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="block w-1 h-1 mt-2 rounded-full bg-blue-400" />
                            <p className="flex-1 text-md leading-relaxed">
                                Keep your response focused and concise
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QuestionSections;