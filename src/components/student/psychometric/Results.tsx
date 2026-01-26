'use client';

import React from "react";
import { IMAGES } from "../../../assets";
import { psychometricData, PsychometricTest } from "./data";
import { Button, Card, CircularProgress } from "./PsychometricUI";
import { CheckCircle2, RotateCcw, LayoutDashboard, Sparkles, TrendingUp, Target } from "lucide-react";
import { cn } from "@/utils/cn";

interface ResultsProps {
    score: number;
    activeTest: PsychometricTest | null;
    onTryAgain: () => void;
    onBackToDashboard: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, onTryAgain, onBackToDashboard }) => {
    return (
        <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 font-poppins">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight italic">
                        Your Assessment Results
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Personalized insights into your cognitive profile and career readiness.
                    </p>
                </header>

                {/* Hero Score Card */}
                <Card className="text-center shadow-xl border-none ring-1 ring-gray-100 relative overflow-hidden bg-white">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-400" />
                    <div className="py-8">
                        <div className="w-24 h-24 mx-auto bg-yellow-50 rounded-3xl flex items-center justify-center mb-6 text-yellow-500 shadow-inner ring-1 ring-yellow-100">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Assessment Completed!
                        </h2>
                        <p className="text-lg text-gray-500 font-medium mb-10">
                            You correctly answered <span className="text-black font-bold">{score} out of 100</span> questions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
                            <Button onClick={onTryAgain} className="h-14 px-10 text-lg flex-1 sm:max-w-[240px]">
                                <RotateCcw className="w-5 h-5" /> Retake Test
                            </Button>
                            <Button variant="outline" onClick={onBackToDashboard} className="h-14 px-10 text-lg flex-1 sm:max-w-[240px]">
                                <LayoutDashboard className="w-5 h-5" /> All Assessments
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Circular Progress Section */}
                    <Card className="md:col-span-1 bg-white border-none shadow-sm ring-1 ring-gray-100 flex flex-col items-center justify-center py-10">
                        <CircularProgress percent={score} />
                        <div className="mt-6 text-center">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Performance</p>
                            <p className="text-xl font-bold text-gray-900">
                                {score >= 80 ? "Exceptional" : score >= 60 ? "Proficient" : "Foundational"}
                            </p>
                        </div>
                    </Card>

                    {/* AI Summary Section */}
                    <Card className="md:col-span-2 bg-yellow-50/50 border-none shadow-sm ring-1 ring-yellow-100">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Sparkles className="text-yellow-500 w-6 h-6 fill-current" />
                                <h3 className="text-xl font-bold text-gray-900">Overall Strength Profile</h3>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed font-medium">
                                You've demonstrated a strong aptitude in logical reasoning and problem identification.
                                Your performance suggests a highly analytical mindset capable of navigating complex data structures
                                and drawing accurate conclusions under time pressure.
                            </p>
                            <div className="bg-white/60 p-4 rounded-2xl border border-yellow-200/50 italic text-sm text-yellow-800 font-bold">
                                "Your ability to identify patterns is in the top 15% of all candidates."
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Key Strengths */}
                    <Card className="ring-1 ring-green-100 bg-white shadow-sm border-none">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="text-green-500 w-6 h-6" />
                            <h3 className="text-xl font-bold text-gray-900">Key Strengths</h3>
                        </div>
                        <div className="space-y-4">
                            {psychometricData.strengths.map((strength, idx) => (
                                <div key={idx} className="p-5 bg-green-50/50 rounded-2xl border border-green-100 flex items-center justify-between group transition-all hover:bg-green-50">
                                    <span className="font-bold text-gray-800 text-base">{strength.name}</span>
                                    <Badge className="bg-green-500 text-white border-none font-bold py-1 px-3 rounded-lg">{strength.score}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Areas to Improve */}
                    <Card className="ring-1 ring-orange-100 bg-white shadow-sm border-none">
                        <div className="flex items-center gap-3 mb-8">
                            <Target className="text-orange-500 w-6 h-6" />
                            <h3 className="text-xl font-bold text-gray-900">Growth Opportunities</h3>
                        </div>
                        <div className="space-y-4">
                            {psychometricData.areasToImprove.slice(0, 2).map((area, idx) => (
                                <div key={idx} className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100 group transition-all hover:bg-orange-50">
                                    <h4 className="font-bold text-gray-800 text-base mb-2 uppercase tracking-wide text-xs">{area.name}</h4>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Global CTA */}
                <div className="bg-black rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-[100px]" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left space-y-4">
                            <h3 className="text-3xl font-bold text-white">Ready for more?</h3>
                            <p className="text-gray-400 text-lg max-w-md font-medium">
                                Apply these insights to your AI Assessment Centre or start a Mock Interview today.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <Button onClick={onBackToDashboard} className="h-14 px-10 text-lg rounded-2xl w-full sm:w-auto">
                                View More Tests
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
