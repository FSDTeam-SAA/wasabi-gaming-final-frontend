'use client';

import React, { useCallback, useState } from "react";
import { psychometricData, PsychometricTest } from "./data";
import { Button, Card, ProgressBar } from "./PsychometricUI";
import Test from "./TestInterface";
import Results from "./Results";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "@/utils/cn";

const PsychometricAssessment = () => {
    const [currentView, setCurrentView] = useState<"psychometricUI" | "test" | "results">("psychometricUI");
    const [activeTest, setActiveTest] = useState<PsychometricTest | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleStartTest = useCallback((testId: number) => {
        const test = psychometricData.tests.find((t) => t.id === testId);
        if (!test) return;
        setActiveTest(test);
        setCurrentQuestion(0);
        setAnswers({});
        setSelectedAnswer(null);
        setCurrentView("test");
    }, []);

    const handleAnswerSelect = useCallback((value: number) => {
        setSelectedAnswer(value);
    }, []);

    const handleNext = useCallback(() => {
        if (selectedAnswer === null || !activeTest) return;

        setAnswers((prev) => ({ ...prev, [currentQuestion]: selectedAnswer }));
        setSelectedAnswer(null);

        if (currentQuestion < activeTest.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentView("results");
        }
    }, [activeTest, currentQuestion, selectedAnswer]);

    const handlePrevious = useCallback(() => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
            setSelectedAnswer(answers[currentQuestion - 1] ?? null);
        }
    }, [currentQuestion, answers]);

    const calculateScore = useCallback(() => {
        if (!activeTest || Object.keys(answers).length === 0) return 0;
        let correct = 0;
        Object.entries(answers).forEach(([idx, ans]) => {
            if (ans === activeTest.questions[Number(idx)].correctAnswer) correct++;
        });
        return Math.round((correct / activeTest.questions.length) * 100);
    }, [activeTest, answers]);

    const score = calculateScore();

    const PsychometricDashboard = () => (
        <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 font-poppins">
            <div className="max-w-7xl mx-auto">
                <header className="mb-14">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight italic">
                        Cognitive Assessments
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Unlock your full professional potential through validated psychometric measurement.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {psychometricData.tests.map((test) => (
                        <Card key={test.id} className="group border-none shadow-sm ring-1 ring-gray-100 hover:ring-yellow-400 transition-all duration-300 bg-white relative overflow-hidden h-full flex flex-col">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div
                                        className={cn(
                                            "w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner transition-transform group-hover:scale-110 duration-300",
                                            test.status === "completed"
                                                ? "bg-purple-50 text-purple-600"
                                                : "bg-yellow-50 text-yellow-600"
                                        )}
                                    >
                                        {test.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {test.name}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{test.duration}</p>
                                    </div>
                                </div>
                                {test.status === "completed" ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 font-bold rounded-full gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50/50 px-4 py-1 font-bold rounded-full">
                                        Available
                                    </Badge>
                                )}
                            </div>

                            <p className="text-gray-500 font-medium text-base mb-8 leading-relaxed flex-1">
                                {test.description}
                            </p>

                            {test.score !== null && (
                                <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100/50">
                                    <div className="flex justify-between mb-3 items-end">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Latest Score</span>
                                        <span className="text-xl font-black text-gray-900">
                                            {test.score}<span className="text-gray-300 text-sm font-bold"> / 100</span>
                                        </span>
                                    </div>
                                    <ProgressBar percent={test.score} />
                                </div>
                            )}

                            <Button
                                variant={test.status !== "completed" ? "primary" : "secondary"}
                                onClick={() => handleStartTest(test.id)}
                                className="w-full h-14 text-lg rounded-2xl group-hover:shadow-lg transition-all"
                            >
                                {test.status === "completed"
                                    ? "View Analysis & Retake"
                                    : "Begin Assessment"}
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Info Card */}
                <Card className="bg-black border-none relative overflow-hidden p-1 p-0">
                    <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-14 relative z-10">
                        <div className="w-20 h-20 rounded-[32px] bg-yellow-400 flex items-center justify-center text-black shadow-2xl shrink-0 rotate-3 group transition-transform hover:rotate-0 duration-500">
                            <SparklesIcon />
                        </div>
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                Why Benchmark Your Cognitive Abilities?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { title: "Personal SWOT", text: "Identify natural strengths and areas to focus training." },
                                    { title: "Career Match", text: "Get tailored recommendations based on your logical profile." },
                                    { title: "Verified Skills", text: "Stand out to law firms with validated assessment scores." },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <p className="text-yellow-400 font-bold uppercase tracking-widest text-[10px]">{item.title}</p>
                                        <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <>
            {currentView === "psychometricUI" && <PsychometricDashboard />}
            {currentView === "test" && (
                <Test
                    activeTest={activeTest}
                    currentQuestion={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    answers={answers}
                    onAnswerSelect={handleAnswerSelect}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            )}
            {currentView === "results" && (
                <Results
                    score={score}
                    activeTest={activeTest}
                    onTryAgain={() => handleStartTest(activeTest!.id)}
                    onBackToDashboard={() => setCurrentView("psychometricUI")}
                />
            )}
        </>
    );
};

const SparklesIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 32 32"
        fill="none"
    >
        <path
            d="M16 23.9993V6.66602"
            stroke="black"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
            stroke="black"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M23.464 8.66619C23.7708 8.13484 23.9513 7.54004 23.9914 6.92778C24.0316 6.31553 23.9303 5.70225 23.6956 5.13538C23.4608 4.56851 23.0987 4.06326 22.6374 3.6587C22.1761 3.25414 21.6279 2.96112 21.0353 2.80232C20.4426 2.64351 19.8214 2.62318 19.2196 2.74288C18.6178 2.86259 18.0517 3.11913 17.5649 3.49265C17.0781 3.86618 16.6838 4.34668 16.4125 4.89698C16.1411 5.44728 16 6.05262 16 6.66619C16 6.05262 15.8589 5.44728 15.5875 4.89698C15.3162 4.34668 14.9219 3.86618 14.4351 3.49265C13.9483 3.11913 13.3822 2.86259 12.7804 2.74288C12.1786 2.62318 11.5574 2.64351 10.9647 2.80232C10.3721 2.96112 9.82387 3.25414 9.36257 3.6587C8.90127 4.06326 8.53923 4.56851 8.30444 5.13538C8.06965 5.70225 7.96842 6.31553 8.00858 6.92778C8.04873 7.54004 8.22919 8.13484 8.536 8.66619"
            stroke="black"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default PsychometricAssessment;
