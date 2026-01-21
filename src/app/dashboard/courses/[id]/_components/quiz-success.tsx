"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ChevronRight, CheckCircle2, Award } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is the most important section of a resume?",
    options: ["Contact Information", "Work Experience and Achievements", "Education", "Hobbies and Interests"],
  },
  {
    id: 2,
    question: "How long should a professional summary typically be?",
    options: ["1-2 sentences", "3-5 sentences", "A full page", "Resumes don't need summaries"],
  },
  {
    id: 3,
    question: "Which format best demonstrates achievement?",
    options: ["Responsible for sales", "Managed sales team", "Increased sales by 15% in Q3 2024", "Worked in sales department"],
  }
];

export default function FinalSuccessQuizModal({ open,setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const [step, setStep] = useState<'quiz' | 'results'>('quiz');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const progressValue = ((currentQuestionIdx + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentQuestionIdx];

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setStep('results');
    }
  };

  const resetQuiz = () => {
    setStep('quiz');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none rounded-[32px] gap-0">
        <DialogHeader className="p-6 pb-2 flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-bold text-slate-800">Final Course Quiz</DialogTitle>
            {step === 'results' && <p className="text-xs text-slate-400">Here are your results</p>}
          </div>
          <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <X className="h-4 w-4 text-slate-400" />
          </DialogClose>
        </DialogHeader>

        {step === 'quiz' ? (
          /* QUIZ VIEW */
          <div className="p-6 pt-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Question {currentQuestionIdx + 1} of {totalQuestions}
            </p>

            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 shrink-0 bg-[#FFFF00] rounded-full flex items-center justify-center font-bold text-slate-900">
                {currentQuestion.id}
              </div>
              <p className="text-sm font-semibold text-slate-800 pt-1 leading-snug">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-2 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-4 rounded-2xl text-[13px] border transition-all ${
                    selectedOption === option 
                    ? "border-[#FFFF00] bg-white ring-1 ring-[#FFFF00] text-slate-900 font-medium" 
                    : "border-slate-100 hover:border-slate-200 text-slate-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Progress</span>
                  <span>{currentQuestionIdx + 1}/{totalQuestions}</span>
                </div>
                <Progress value={progressValue} className="h-1.5 bg-slate-100 [&>div]:bg-[#FFFF00]" />
              </div>

              <div className="flex gap-3 pt-2">
                <DialogClose asChild>
                  <Button variant="ghost" className="flex-1 text-slate-400 text-xs font-bold hover:bg-transparent">
                    Cancel Quiz
                  </Button>
                </DialogClose>
                <Button 
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="flex-[1.5] bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-slate-900 font-bold rounded-xl text-xs h-10"
                >
                  {currentQuestionIdx === totalQuestions - 1 ? "Submit Quiz" : "Next Question"}
                  {currentQuestionIdx !== totalQuestions - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="p-6 pt-0 space-y-6">
            <div className="bg-[#F0FFF4] border border-[#DCFCE7] rounded-3xl p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-[#22C55E]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#166534]">Congratulations! 🎉</h2>
                <p className="text-[#22C55E] font-semibold">You scored 100% (3 out of 3)</p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] mx-auto">
                You've successfully completed this course and earned your certificate!
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">Answer Review</p>
              {questions.map((q) => (
                <div key={q.id} className="flex items-center gap-3 p-4 bg-[#F0FFF4] border border-[#DCFCE7] rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                  <p className="text-[13px] text-slate-600 font-medium truncate">{q.question}</p>
                </div>
              ))}
            </div>

            <DialogClose asChild>
              <Button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl h-12">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}