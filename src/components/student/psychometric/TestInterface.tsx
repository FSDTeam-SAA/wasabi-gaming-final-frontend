'use client';

import React from "react";
import { Button, Card, ProgressBar } from "./PsychometricUI";
import Question from "./Question";
import { PsychometricTest } from "./data";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface TestProps {
    activeTest: PsychometricTest | null;
    currentQuestion: number;
    selectedAnswer: number | null;
    answers: Record<number, number>;
    onAnswerSelect: (index: number) => void;
    onNext: () => void;
    onPrevious: () => void;
}

const Test: React.FC<TestProps> = ({
    activeTest,
    currentQuestion,
    selectedAnswer,
    answers,
    onAnswerSelect,
    onNext,
    onPrevious,
}) => {
    if (!activeTest) return null;

    const progress = ((currentQuestion + 1) / activeTest.questions.length) * 100;
    const question = activeTest.questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-poppins">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-yellow-400 pl-4">
                            Practice Assessment: <span className="text-gray-500 font-medium">{activeTest.name}</span>
                        </h2>
                        <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-gray-400 border uppercase tracking-wider">
                            Question {currentQuestion + 1} <span className="text-gray-200 mx-1">/</span> {activeTest.questions.length}
                        </span>
                    </div>
                    <ProgressBar percent={progress} />
                </div>

                <Card className="mb-8 shadow-sm">
                    <Question
                        question={question}
                        selectedAnswer={selectedAnswer}
                        onAnswerSelect={onAnswerSelect}
                    />
                </Card>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={onPrevious}
                        disabled={currentQuestion === 0}
                        className="w-full md:w-40 h-14"
                    >
                        <ChevronLeft className="w-5 h-5" /> Previous
                    </Button>

                    <div className="flex gap-2 flex-wrap justify-center bg-white p-2 rounded-2xl border shadow-sm px-4">
                        {activeTest.questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300",
                                    idx === currentQuestion
                                        ? "bg-yellow-400 text-black shadow-md ring-2 ring-yellow-200"
                                        : answers[idx] !== undefined
                                            ? "bg-green-50 text-green-600 border border-green-100"
                                            : "bg-gray-50 text-gray-400 border border-gray-100"
                                )}
                            >
                                {answers[idx] !== undefined && idx !== currentQuestion ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={onNext}
                        disabled={selectedAnswer === null}
                        className="w-full md:w-40 h-14"
                    >
                        {currentQuestion === activeTest.questions.length - 1
                            ? "Finish Assessment"
                            : <>Next Question <ChevronRight className="w-5 h-5" /></>}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Test;
