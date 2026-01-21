"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    CheckCircle2,
    Clock,
    Trophy,
    BookOpen,
    GraduationCap,
    Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuizModal from "./quiz-modal";

const SingelCourse = () => {
    const lessons = [
        {
            title: "Introduction to Resume Writing",
            duration: "15:30",
            video: "https://player.vimeo.com/external/456789987.sd.mp4?s=demo", // replace with real MP4
            completed: true,
            active: false,
        },
        {
            title: "Crafting Your Professional Summary",
            duration: "20:15",
            video: "https://player.vimeo.com/external/123456789.sd.mp4?s=demo", // replace with real MP4
            completed: true,
            active: false,
        },
        {
            title: "Highlighting Your Achievements",
            duration: "18:45",
            video: "https://player.vimeo.com/external/987654321.sd.mp4?s=demo", // replace with real MP4
            completed: true,
            active: true,
        },
    ];
    const [open, setOpen] = useState(false);

    const [currentLesson, setCurrentLesson] = useState(
        lessons.find((l) => l.active) || lessons[0]
    );

    return (
        <div className="container mx-auto p-6 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="mb-8 flex items-center gap-4 pb-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full border-slate-300 flex items-center"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses
                </Button>
                <div>
                    <h1 className="text-2xl text-slate-800">Resume Writing Mastery</h1>
                    <p className="text-slate-500 text-sm">Sarah Johnson</p>
                </div>
            </header>

            {/* Progress */}
            <Card className="mb-8 border-[#0000001A] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-[#1E1E1E]">Your Progress</h2>
                        <Badge className="bg-[#FFFF00] hover:bg-[#FFFF00] text-slate-900 text-[10px] px-2 py-0.5">
                            {lessons.filter((l) => l.completed).length} / {lessons.length} Videos
                            Watched
                        </Badge>
                    </div>
                    <Progress
                        value={lessons.filter((l) => l.completed).length * 30 / lessons.length}

                    />
                </CardContent>
            </Card>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar with lessons */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-[#1E1E1E] mb-4">Course Content</h3>
                    {lessons.map((lesson, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`p-4 rounded-xl border border-[#0000001A] flex items-start gap-3 cursor-pointer transition-colors ${currentLesson.title === lesson.title
                                ? "bg-[#FEFCE8] border-2 border-[#FFFF00]"
                                : "bg-white border-slate-100"
                                }`}
                        >
                            <CheckCircle2
                                className={`w-5 h-5 mt-0.5 ${lesson.completed ? "text-green-500" : "text-slate-300"
                                    }`}
                            />
                            <div>
                                <p className="text-sm font-semibold text-[#1E1E1E]">
                                    {lesson.title}
                                </p>
                                <div className="flex items-center text-[11px] text-slate-500 mt-1">
                                    <Clock className="w-3 h-3 mr-1" /> {lesson.duration}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video Player Column */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden border-slate-100 shadow-sm">
                        <div className="aspect-video bg-black relative">
                            <video
                                key={currentLesson.video}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay={false}
                            >
                                <source src={currentLesson.video} type="video/mp4" />
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                    </Card>
                    <Card className="mt-4 p-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            {currentLesson.title}
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">
                            This video is part of your Resume Writing Mastery course.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Quiz CTA */}
            <Card className="mt-8 bg-[linear-gradient(135deg,#FEFCE8_0%,#FFF7ED_100%)] border-2 rounded-xl border-[#FFFF00] ">
                <CardContent className="p-8 flex flex-col md:flex-row gap-6">
                    <div className="h-16 w-16 flex bg-[#FFFF00] items-center justify-center rounded-xl">
                        <Award className="text-[#1E1E1E]" size={20} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl text-slate-800">Ready for the Final Quiz?</h3>
                        <p className="text-slate-600 text-sm mt-1">
                            You've watched all the lessons! Take the final quiz to complete this
                            course and earn your certificate. You’ll need to score at least 70%
                            to pass.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" /> {lessons.length} Questions
                            </span>
                            <span className="flex items:center gap-1">
                                <Trophy className="w-4 h-4" /> 70% to Pass
                            </span>
                            <span className="flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" /> Certificate
                            </span>
                        </div>
                        <Button onClick={()=>setOpen(true)} className="mt-6 bg-[#FFFF00] hover:bg-[#FFFF00]/50 font-semibold text-slate-900 px-8 rounded-xl">
                            Take Final Quiz
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <footer className="mt-12 py-8 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400">
                    © 2025 Aspiring - Your Path to Professional Growth
                </p>
            </footer>
            {/* Quiz CTA */}
            <QuizModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default SingelCourse;
