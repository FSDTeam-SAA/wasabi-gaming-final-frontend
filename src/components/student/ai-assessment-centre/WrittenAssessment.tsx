'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIAssessmentTest } from "./aiAssessmentData";

interface WrittenAssessmentProps {
    onCancel: () => void;
    onSubmit: (data: { testId: number; response: string; wordCount: number }) => void;
    test: AIAssessmentTest;
}

const WrittenAssessment: React.FC<WrittenAssessmentProps> = ({ onCancel, onSubmit, test }) => {
    const [response, setResponse] = useState("");
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        if (test?.content) {
            setResponse("");
            setWordCount(0);
        }
    }, [test]);

    const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setResponse(text);

        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        setWordCount(text.trim() === "" ? 0 : words.length);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                testId: test.id,
                response,
                wordCount,
            });
        }
    };

    const currentTest = test || {
        content: {
            caseStudy: {
                title: "Case Study",
                description:
                    "You are an analyst at a consulting firm. Your manager has requested a brief email about a recent client case:",
                client: "Ventara Automotive",
                scenario:
                    "Our client, Ventara, is experiencing delays in the launch of their new electric vehicle. The main issues include supply chain disruptions and technical challenges with the battery system. This could affect their position in the market and profitability.",
                instructions: [
                    "Summarize the main issues",
                    "Explain potential impact on client relationship",
                    "Suggest two next steps",
                ],
            },
            writingTask: {
                title: "Case Study",
                description: "Write an internal email to your manager",
                greeting: "Dear [Manager],",
                wordLimit: 300,
                requirements: [
                    "Use at least 300 words",
                    "Use a professional or concise tone",
                    "Structure your response clearly",
                ],
            },
        },
    };

    const caseStudy = currentTest.content.caseStudy!;
    const writingTask = currentTest.content.writingTask!;

    return (
        <div className="min-h-screen bg-white font-poppins p-4 md:p-8">
            <header className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Written assessment</h1>
            </header>

            <div className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border rounded-xl overflow-hidden shadow-sm">
                    {/* Left Column - Case Study */}
                    <div className="p-6 md:p-8 border-r bg-white">
                        <h3 className="text-lg md:text-xl font-bold mb-4">Case Study</h3>
                        <div className="text-base font-semibold text-[#4A5565] py-4">
                            {caseStudy.description}
                        </div>

                        {caseStudy.client && (
                            <div className="mt-4">
                                <h4 className="text-lg font-bold">{caseStudy.client}</h4>
                                <div className="text-base font-semibold text-[#4A5565] py-4">
                                    {caseStudy.scenario}
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            <div className="text-base font-semibold text-[#4A5565] mb-2">
                                In your email to your manager:
                            </div>
                            <ul className="space-y-2">
                                {caseStudy.instructions.map((instruction, index) => (
                                    <li
                                        className="text-base font-semibold text-[#4A5565] flex items-start gap-2"
                                        key={index}
                                    >
                                        <span>•</span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Writing Task */}
                    <div className="p-6 md:p-8 bg-white">
                        <h3 className="text-lg md:text-xl font-bold mb-4">Writing Task</h3>
                        <div className="text-base font-semibold text-[#4A5565] py-4">
                            {writingTask.description}
                        </div>

                        {writingTask.greeting && (
                            <div className="text-base font-semibold text-[#4A5565] py-2">
                                {writingTask.greeting}
                            </div>
                        )}

                        <div className="mt-4">
                            <Textarea
                                value={response}
                                onChange={handleResponseChange}
                                placeholder="Type your response here..."
                                className="w-full h-80 p-4 border-gray-200 resize-none rounded-xl bg-gray-50 focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`font-bold text-base ${wordCount >= writingTask.wordLimit
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {wordCount}/{writingTask.wordLimit} words
                                </span>
                                {wordCount < writingTask.wordLimit && (
                                    <span className="text-red-500 text-sm italic">
                                        (Minimum {writingTask.wordLimit} words required)
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-1">
                                {writingTask.requirements.map((requirement, index) => (
                                    <li
                                        className="text-sm font-medium text-[#4A5565] flex items-start gap-2"
                                        key={index}
                                    >
                                        <span>•</span>
                                        <span>{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 mb-8 flex flex-col sm:flex-row justify-center gap-4 px-4">
                    <Button
                        variant="outline"
                        className="w-full sm:w-40 font-semibold h-12"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full sm:w-40 font-semibold h-12 bg-yellow-400 hover:bg-yellow-500 text-black border-none"
                        onClick={handleSubmit}
                        disabled={wordCount < writingTask.wordLimit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WrittenAssessment;
