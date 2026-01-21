"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ChevronRight } from "lucide-react";

const questions = [
    {
        id: 1,
        question: "What is the most important section of a resume?",
        options: ["Contact Information", "Work Experience and Achievements", "Education", "Hobbies and Interests"],
    },
    {
        id: 2,
        question: "How long should a standard professional resume be?",
        options: ["1-2 pages", "3-5 pages", "As long as possible", "Exactly half a page"],
    },
    {
        id: 3,
        question: "Which format best demonstrates achievement?",
        options: ["Responsible for sales", "Managed sales team", "Increased sales by 15% in Q3 2024", "Worked in sales department"],
    },
];

export default function QuizModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const totalSteps = questions.length;
    const progressValue = (currentStep / totalSteps) * 100;
    const currentQuestion = questions[currentStep - 1];

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setSelectedOption(null);
        } else {
            alert("Quiz submitted! 🎉");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-3xl bg-white shadow-lg">
                <DialogHeader className="p-6 pb-0 flex  justify-between">
                    <DialogTitle className="text-xl font-bold text-slate-800">
                        Final Course Quiz
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-2">
                    {/* Question Number */}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Question {currentStep} of {totalSteps}
                    </p>

                    <div className=" py-4 px-6 rounded-3xl"
                        style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)" }}
                    >
                        {/* Question */}
                        <div className="flex gap-3 mb-6  items-center justify-center">
                            <div className="w-10 h-10 shrink-0 bg-[#FFFF00] rounded-full flex items-center justify-center font-bold text-slate-900">
                                {currentStep}
                            </div>
                            <p className="text-sm font-semibold text-slate-800 pt-1 leading-snug">
                                {currentQuestion.question}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelectedOption(option)}
                                    className={`w-full text-left p-4 rounded-xl text-xs border transition-all ${selectedOption === option
                                        ? "border-[#FFFF00] bg-[#FFFEF0] shadow-sm ring-1 ring-[#FFFF00]"
                                        : "border-slate-100 bg-[#FFFFFF] hover:border-slate-200 text-slate-600"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress & Buttons */}
                    <div className="space-y-6 mt-5">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                <span>Progress</span>
                                <span>{currentStep}/{totalSteps}</span>
                            </div>
                            <Progress
                                value={progressValue}
                                className="h-1.5 bg-slate-100 [&>div]:bg-[#FFFF00]"
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* Cancel Button */}
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    className="flex-1 text-[#1E1E1E] border border-[#0000001A] rounded-3xl text-xs font-bold hover:bg-transparent"
                                >
                                    Cancel Quiz
                                </Button>
                            </DialogClose>

                            {/* Next/Submit Button */}
                            <Button
                                onClick={handleNext}
                                disabled={!selectedOption}
                                className="flex-[1.5] bg-[#FFFF00] hover:bg-[#FFFF00]/90 border border-[#0000001A]  text-slate-900 font-bold rounded-3xl text-xs"
                            >
                                {currentStep === totalSteps ? "Submit Quiz" : "Next Question"}
                                {currentStep !== totalSteps && (
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
