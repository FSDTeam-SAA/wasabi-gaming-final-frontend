'use client';

import React from "react";
import { IMAGES } from "../../../assets";
import { PsychometricTest } from "@/lib/api/psychometric/psychometricApi";
import { Button, Card, CircularProgress } from "./PsychometricUI";
import { CheckCircle2, RotateCcw, LayoutDashboard, Sparkles, TrendingUp, Target, Users, Brain, BarChart } from "lucide-react";
import { cn } from "@/utils/cn";

interface ResultsProps {
    score: number;
    correctCount: number;
    totalCount: number;
    activeTest: PsychometricTest | null;
    onTryAgain: () => void;
    onBackToDashboard: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, correctCount, totalCount, activeTest, onTryAgain, onBackToDashboard }) => {
    return (
        <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 font-poppins text-black">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight italic">
                        Your Psychometric Test Results
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Gain insights into your strengths and areas for growth.
                    </p>
                </header>

                {/* Hero Score Card */}
                <Card className="text-center shadow-xl border-none ring-1 ring-gray-100 relative overflow-hidden bg-white">
                    <div className="py-12 flex flex-col items-center">
                        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 text-yellow-500 shadow-inner overflow-hidden border-4 border-yellow-100">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Test Completed!
                        </h2>
                        <p className="text-base text-gray-500 font-medium mb-10">
                            You scored <span className="text-black font-bold">{correctCount} out of {totalCount}</span> questions correctly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-6 w-full max-w-md">
                            <Button onClick={onTryAgain} className="h-11 px-8 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-none shadow-sm flex-1">
                                Try Again
                            </Button>
                            <Button variant="outline" onClick={onBackToDashboard} className="h-11 px-8 rounded-xl border-gray-200 text-gray-700 font-medium flex-1">
                                Review Answers
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Overall Performance Summary</h3>
                    <Card className="bg-white border-2 border-gray-100 shadow-sm p-8">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <CircularProgress percent={score} />
                            <div className="space-y-4 flex-1 text-center md:text-left">
                                <p className="text-xl font-bold text-yellow-400">
                                    Score: {correctCount} out of {totalCount} correct
                                </p>
                                <p className="text-gray-500 font-medium leading-relaxed max-w-2xl">
                                    You've completed the test. While your score shows room for improvement, this is a great opportunity to build stronger analytical and reasoning skills.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Key Strengths</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-6 flex items-center gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">Numerical Reasoning</h4>
                                    <p className="text-xs text-gray-500 font-medium">Ratios, rates</p>
                                </div>
                            </Card>
                            <Card className="p-6 flex items-center gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">Abstract Reasoning</h4>
                                    <p className="text-xs text-gray-500 font-medium">Pattern recognition</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Areas to Improve</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "Situational Judgment & Prioritisation", desc: "Focus on collaboration and proactive communication.", icon: Users },
                                { title: "Verbal Reasoning & Critical Thinking", desc: "Practice logical analysis and evaluating arguments.", icon: Brain },
                                { title: "Numerical Accuracy", desc: "Review percentages and averages carefully.", icon: BarChart }
                            ].map((area, i) => (
                                <Card key={i} className="p-6 space-y-3 bg-white border border-gray-100 shadow-sm rounded-2xl">
                                    <area.icon className="w-5 h-5 text-yellow-500" />
                                    <h4 className="font-bold text-gray-900 text-[13px] leading-tight">{area.title}</h4>
                                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{area.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50/50 border border-yellow-200 rounded-[24px] p-8 space-y-6">
                    <div className="flex items-center gap-2 text-yellow-600">
                        <Sparkles className="w-5 h-5 fill-current" />
                        <span className="text-sm font-bold uppercase tracking-wider">AI-Powered Feedback</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <p className="text-sm text-gray-600 font-medium leading-relaxed flex-1">
                            Psychometric skills are highly trainable. Focus on understanding the reasoning behind each question type and applying systematic problem-solving strategies. With consistent practice, you can significantly enhance your performance.
                        </p>
                        <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Study" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#FFFF00] rounded-[16px] p-6 relative overflow-hidden flex items-center gap-4">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold">"</span>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-900 leading-tight italic">
                            "Every great achiever was once a beginner. Keep learning, keep growing."
                        </p>
                        <p className="text-xs text-black/60 font-medium italic">— Aspiring Legal Network Team</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Next Steps for You</h3>
                    <div className="bg-white border rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:border-yellow-400 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                <Target className="w-4 h-4" />
                            </div>
                            <span className="text-[13px] font-bold text-gray-700">Take a Verbal Reasoning Test</span>
                        </div>
                        <div className="w-6 h-6 border rounded flex items-center justify-center text-gray-300 group-hover:text-yellow-500 transition-colors">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
