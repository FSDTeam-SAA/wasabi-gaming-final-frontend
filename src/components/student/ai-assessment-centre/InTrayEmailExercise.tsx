'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AIAssessmentTest } from "./aiAssessmentData";

interface InTrayEmailExerciseProps {
    onCancel: () => void;
    onSubmit: (data: { testId: number; response: string; wordCount: number; timeSpent: number }) => void;
    test: AIAssessmentTest;
}

const InTrayEmailExercise: React.FC<InTrayEmailExerciseProps> = ({ onCancel, onSubmit, test }) => {
    const [response, setResponse] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(24 * 60 + 2);

    useEffect(() => {
        if (test?.content) {
            setResponse("");
            setWordCount(0);
        }
    }, [test]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setResponse(text);

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(text.trim() === "" ? 0 : words.length);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                testId: test.id,
                response,
                wordCount,
                timeSpent: 24 * 60 + 2 - timeLeft
            });
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const currentTest = test || {
        content: {
            header: {
                title: "IN-TRAY EMAIL EXERCISE",
                time: "24:02"
            }
        }
    };

    const title = currentTest.content.header?.title || "IN-TRAY EMAIL EXERCISE";
    const emails = currentTest.content.emails || [];
    const requirements = currentTest.content.requirements || { wordLimit: 150, instructions: [] };

    const getPriorityBadgeStyle = (priority: string) => {
        switch (priority) {
            case "HIGH":
                return "bg-yellow-400 text-black border-none hover:bg-yellow-500";
            default:
                return "bg-gray-100 text-black border-none hover:bg-gray-200";
        }
    };

    return (
        <div className="flex flex-col min-h-[70vh] bg-white font-poppins px-4 md:px-12 mt-4 md:mt-8">
            <header className="bg-[#fef9c2] p-4 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg">
                <h2 className="text-lg md:text-2xl font-bold text-[#1E1E1E]">
                    {title}
                </h2>
                <div className="text-lg md:text-2xl font-bold text-[#1E1E1E]">
                    {formatTime(timeLeft)}
                </div>
            </header>

            <main className="mt-6 flex flex-col lg:flex-row gap-6">
                {/* Left Column - Inbox */}
                <section className="flex-1 min-w-0 border rounded-xl overflow-hidden shadow-sm bg-white p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-[#1E1E1E] mb-6">
                        Inbox
                    </h3>

                    <div className="space-y-4">
                        {emails.map((email, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-100 rounded-lg bg-white"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <h4 className="text-sm md:text-base font-bold text-[#1E1E1E] flex-1">
                                        {email.subject}
                                    </h4>
                                    <Badge className={getPriorityBadgeStyle(email.priority)}>
                                        {email.priority}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Right Column - Email Content */}
                <section className="flex-1 min-w-0 border rounded-xl overflow-hidden shadow-sm bg-white p-4 md:p-6">
                    <div className="mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#1E1E1E]">
                            James Turner, Associate
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-[#4A5565]">Assistant</span>
                            <span className="text-sm text-[#4A5565]">09:45</span>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <p className="text-sm md:text-base text-[#4A5565] leading-relaxed">
                        {emails[0]?.content || "No content available"}
                    </p>

                    <Separator className="my-4" />

                    <h3 className="text-lg md:text-xl font-bold text-[#1E1E1E] mb-4">
                        Your Response
                    </h3>

                    <Textarea
                        rows={6}
                        placeholder="Write your reply here...."
                        value={response}
                        onChange={handleResponseChange}
                        className="w-full p-4 border border-gray-200 rounded-lg resize-none bg-white focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                    />

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className={`text-sm md:text-base font-bold ${wordCount >= requirements.wordLimit ? 'text-green-600' : 'text-red-500'
                            }`}>
                            {wordCount}/{requirements.wordLimit} words
                        </span>
                        {wordCount > requirements.wordLimit && (
                            <span className="text-red-500 text-xs md:text-sm italic">
                                (Maximum {requirements.wordLimit} words allowed)
                            </span>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            variant="outline"
                            className="w-full sm:w-32 bg-yellow-400 hover:bg-yellow-500 text-[#1E1E1E] border-none font-bold"
                            onClick={onCancel}
                        >
                            Save Draft
                        </Button>
                        <Button
                            className="w-full sm:w-32 bg-yellow-400 hover:bg-yellow-500 text-[#1E1E1E] border-none font-bold"
                            onClick={handleSubmit}
                            disabled={wordCount > requirements.wordLimit || wordCount === 0}
                        >
                            Submit All
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default InTrayEmailExercise;
