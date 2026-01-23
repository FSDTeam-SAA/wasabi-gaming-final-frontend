"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SingleCourseResponse } from "@/types/course";

const SingelCourse = ({ id }: { id: string }) => {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzA1Y2I1NzI0OTlhOWZiOWFiNjg1YSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGdtYWlsLmNvbSIsImlhdCI6MTc2OTE3MzA3NCwiZXhwIjoxNzY5Nzc3ODc0fQ.36x1EbnpCGOGwJUv4afIG8wAL9PCZ8foDIS_YJNW4CY";

  const { data, isLoading, isError } = useQuery<SingleCourseResponse>({
    queryKey: ["single-course", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${id}/student`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to load course");
      return res.json();
    },
  });

  const course = data?.data;
  const lessons = course?.courseVideo || [];

  const [currentLesson, setCurrentLesson] = useState<
    (typeof lessons)[0] | null
  >(null);

  const [open, setOpen] = useState(false);

  // Set first lesson as default on load
  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !course) return <p>Something went wrong</p>;

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen font-sans">

      <header className="mb-8 flex items-center gap-4 pb-4">
        <Button
          onClick={() => router.push("/dashboard/courses")}
          variant="outline"
          size="sm"
          className="text-xs rounded-full border-slate-300 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses
        </Button>
        <div>
          <h1 className="text-2xl text-slate-800">{course.name}</h1>
          <p className="text-slate-500 text-sm">
            Grade {course.gradeLevel} • {course.category}
          </p>
        </div>
      </header>

      {/* ================= PROGRESS ================= */}
      <Card className="mb-8 border-[#0000001A] rounded-2xl shadow-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-[#1E1E1E]">Your Progress</h2>
            <Badge
              className={`text-slate-900 text-[10px] px-2 py-0.5 ${(lessons.filter(l => l.attempted).length === lessons.length)
                ? "bg-green-500 text-white"
                : "bg-[#FFFF00]"
                }`}
            >
              {lessons.length} Total Videos
            </Badge>
          </div>
          <Progress className={`${(lessons.filter(l => l.attempted).length / lessons.length) * 100 === 100
            ? "bg-green-500"
            : "bg-[#FFFF00]"
            }`} value={lessons.filter(l => l.attempted).length / lessons.length * 100} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[#1E1E1E] mb-4">Course Content</h3>

          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => setCurrentLesson(lesson)}
              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer
                ${currentLesson?._id === lesson._id
                  ? "bg-[#FEFCE8] border-[#FFFF00]"
                  : "bg-white border-slate-200"
                }`}
            >
              <CheckCircle2
                className={`w-5 h-5 mt-0.5 ${lesson.attempted ? "text-green-500" : "text-slate-300"
                  }`}
              />

              <div>
                <p className="text-sm font-semibold text-[#1E1E1E]">
                  {lesson.title}
                </p>
                <div className="flex items-center text-[11px] text-slate-500 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-slate-100 shadow-sm">
            <div className="aspect-video bg-black">
              {currentLesson && (
                <video
                  key={currentLesson.url}
                  className="w-full h-full object-cover"
                  controls
                >
                  <source src={currentLesson.url} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <h2 className="text-xl font-bold text-slate-800">
              {currentLesson?.title}
            </h2>
            <p className="text-slate-500 text-sm mt-2">{course.description}</p>
          </Card>
        </div>
      </div>

      {/* ================= QUIZ CARD ================= */}
      <Card className="mt-8 bg-[linear-gradient(135deg,#FEFCE8_0%,#FFF7ED_100%)] border-2 rounded-xl border-[#FFFF00]">
        <CardContent className="p-8 flex flex-col md:flex-row gap-6">
          <div className="h-16 w-16 flex bg-[#FFFF00] items-center justify-center rounded-xl">
            <Award className="text-[#1E1E1E]" size={20} />
          </div>

          <div className="flex-1">
            <h3 className="text-xl text-slate-800">Ready for the Quiz?</h3>

            <p className="text-slate-600 text-sm mt-1">
              Quiz data comes from selected video.
            </p>

            <div className="flex gap-4 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {currentLesson?.quiz?.length || 0} Questions
              </span>

              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                70% to Pass
              </span>

              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Certificate
              </span>
            </div>
            {
              currentLesson?.attempted && <p className="text-sm font-semibold text-green-500 mt-2">You have already attempted the quiz.</p>
            }
            <Button
              onClick={() => setOpen(true)}
              disabled={currentLesson?.attempted || !currentLesson?.quiz?.length}
              className="mt-6 bg-[#FFFF00] text-slate-900 rounded-xl"
            >
              Take Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= FOOTER ================= */}
      <footer className="mt-12 py-8 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400">© 2025 Aspiring</p>
      </footer>

      {/* ================= QUIZ MODAL ================= */}
      <QuizModal
        open={open}
        setOpen={setOpen}
        courseId={course._id}
        currentLesson={currentLesson}
      />
    </div>
  );
};

export default SingelCourse;
