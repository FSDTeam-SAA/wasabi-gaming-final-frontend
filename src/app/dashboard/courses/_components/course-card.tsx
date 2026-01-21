import React from 'react';

import { Star, Users, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
    {
        title: "Resume Writing Mastery",
        description: "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
        image: "/card1.jpg", // Replace with your image paths
        level: "Beginner",
        category: "Career Development",
        duration: "2h 30m",
        rating: 4.8,
        students: 1250,
        progress: 33,
        isFree: true,
    },
    {
        title: "Resume Writing Mastery",
        description: "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
        image: "/card1.jpg", // Replace with your image paths
        level: "Beginner",
        category: "Career Development",
        duration: "2h 30m",
        rating: 4.8,
        students: 1250,
        progress: 33,
        isFree: true,
    },
    {
        title: "Resume Writing Mastery",
        description: "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
        image: "/card1.jpg",
        level: "Beginner",
        category: "Career Development",
        duration: "2h 30m",
        rating: 4.8,
        students: 1250,
        progress: 33,
        isFree: true,
    },
    {
        title: "Resume Writing Mastery",
        description: "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
        image: "/card1.jpg",
        level: "Beginner",
        category: "Career Development",
        duration: "2h 30m",
        rating: 4.8,
        students: 1250,
        progress: 33,
        isFree: true,
    },
    // Add other course objects here...
];

export default function CourseCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
            {courses.map((course, index) => (
                <Card key={index} className="overflow-hidden border border-[#0000001A] shadow-sm rounded-2xl bg-white">
                    {/* Top Image Section */}
                    <div className="relative h-48 w-full">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="object-cover w-full h-full"
                        />
                        {course.isFree && (
                            <Badge className="absolute top-3 right-3 bg-[#00A63E]  text-white  px-2 py-1 text-[10px] flex items-center justify-center rounded-full">
                                FREE
                            </Badge>
                        )}
                    </div>

                    <CardHeader className="space-y-4 pt-6">
                        <div className="flex gap-2">
                            <Badge variant="secondary" className=" text-slate-600 border-[#0000001A] border font-normal hover:bg-slate-100">
                                {course.level}
                            </Badge>
                            <Badge variant="secondary" className=" text-slate-600 border-[#0000001A] border font-normal hover:bg-slate-100">
                                {course.category}
                            </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 leading-tight">
                            {course.title}
                        </h3>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                            {course.description}
                        </p>

                        <div className="flex items-center justify-between text-slate-500 text-sm">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-medium text-slate-700">{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.students}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-[#FFFF0033] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#FFFF00] transition-all"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="pb-6">
                        <Button className="w-full bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-slate-900  py-2 rounded-xl transition-all">
                            Continue Learning
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}