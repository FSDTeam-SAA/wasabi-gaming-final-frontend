'use client';

import React, { useCallback, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Card, ProgressBar } from "./PsychometricUI";
import { Button } from "@/components/ui/button";
import Test from "./TestInterface";
import Results from "./Results";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, PlayCircle, Brain, BarChart, Lightbulb, Users, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  getAllPsychometricTests,
  getMyPsychometricAnswers,
  submitPsychometricAttempt,
  tryAgainPsychometricAttempt,
  PsychometricTest,
  UserAttempt
} from "@/lib/api/psychometric/psychometricApi";

// Helper to map API category to icons
const getTestIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("verbal")) return <Brain className="w-6 h-6" />;
  if (cat.includes("numerical")) return <BarChart className="w-6 h-6" />;
  if (cat.includes("abstract")) return <Lightbulb className="w-6 h-6" />;
  if (cat.includes("situational") || cat.includes("sjt")) return <Users className="w-6 h-6" />;
  return <Brain className="w-6 h-6" />;
};

const PsychometricAssessment = () => {
  const { data: session } = useSession();
  // @ts-ignore
  const token = session?.accessToken || session?.user?.accessToken || "";

  const [currentView, setCurrentView] = useState<"psychometricUI" | "test" | "results">("psychometricUI");
  const [activeTest, setActiveTest] = useState<PsychometricTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const queryClient = useQueryClient();

  // Queries
  const { data: testsData, isLoading: isLoadingTests } = useQuery({
    queryKey: ['psychometricTests'],
    queryFn: getAllPsychometricTests
  });

  const { data: myAnswersData, isLoading: isLoadingMyAnswers, refetch: refetchMyAnswers } = useQuery({
    queryKey: ['myPsychometricAnswers', token],
    queryFn: () => getMyPsychometricAnswers(token),
    enabled: !!token
  });

  // Mutations
  const submissionMutation = useMutation({
    mutationFn: ({ testId, answers, isRetry }: { testId: string, answers: any[], isRetry: boolean }) => {
      if (isRetry) {
        return tryAgainPsychometricAttempt(testId, answers, token);
      }
      return submitPsychometricAttempt(testId, answers, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPsychometricAnswers', token] });
      setCurrentView("results");
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      alert("Failed to submit test. Please try again.");
    }
  });

  // Merge Tests with User Attempts
  const dashboardTests = useMemo(() => {
    if (!testsData?.data) return [];
    return testsData.data.map(test => {
      const attempt = myAnswersData?.data?.find((a: UserAttempt) => a.test._id === test._id);
      const totalQuestions = test.allQuestions?.length || 0;
      const rawScore = attempt?.score || 0;
      const percentageScore = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 100) : 0;

      return {
        ...test,
        status: attempt ? 'completed' : 'available',
        userScore: attempt ? percentageScore : null,
        icon: getTestIcon(test.category),
        description: `Assess your ${test.category} skills.`,
        duration: "15-20 min"
      };
    });
  }, [testsData, myAnswersData]);

  const handleStartTest = useCallback((testId: string) => {
    const test = testsData?.data?.find((t) => t._id === testId);
    if (!test) return;
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setCurrentView("test");
  }, [testsData]);

  const handleAnswerSelect = useCallback((value: number) => {
    setSelectedAnswer(value);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || !activeTest) return;

    const updatedAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(updatedAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < (activeTest.allQuestions?.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const formattedAnswers = activeTest.allQuestions.map((q, idx) => ({
        questionId: q._id,
        userAnswer: q.options[updatedAnswers[idx] ?? 0],
        timeTakenSec: q.timeTakenSec || 10
      }));

      const isRetry = dashboardTests.find(t => t._id === activeTest._id)?.status === "completed";

      submissionMutation.mutate({
        testId: activeTest._id,
        answers: formattedAnswers,
        isRetry
      });
    }
  }, [activeTest, currentQuestion, selectedAnswer, answers, dashboardTests, token, submissionMutation]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  }, [currentQuestion, answers]);

  const score = submissionMutation.data?.data?.score || 0;
  const totalQuestionsCount = activeTest?.allQuestions?.length || 0;
  const percentageScore = totalQuestionsCount > 0 ? Math.round((score / totalQuestionsCount) * 100) : 0;

  if (isLoadingTests || submissionMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          {submissionMutation.isPending && <p className="text-gray-500 font-medium">Submitting results...</p>}
        </div>
      </div>
    );
  }

  const PsychometricDashboard = () => (
    <div className="min-h-screen bg-white p-4 md:p-12 font-poppins">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Psychometric Assessment
          </h1>
          <p className="text-gray-500">
            Discover your cognitive strengths and ideal career paths.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardTests.map((test) => (
            <div key={test._id} className="bg-white rounded-3xl border border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-purple-100 text-purple-600"
                  )}>
                    {test.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {test.category}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {test.description}
                    </p>
                  </div>
                </div>
                {test.status === "completed" ? (
                  <Badge variant="secondary" className="bg-green-200 text-green-800 hover:bg-green-200 border border-green-300 px-3 py-1 font-medium rounded-full gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-yellow-800 border-yellow-300 bg-yellow-200 px-3 py-1 font-medium rounded-full shrink-0">
                    Available
                  </Badge>
                )}
              </div>

              {test.status === "completed" && test.userScore !== null ? (
                <div className="space-y-4 mt-auto">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-gray-500">Your Score</span>
                    <span className="text-lg font-bold text-gray-900">
                      {test.userScore}<span className="text-gray-400 text-sm font-normal">/100</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFFF00] rounded-full"
                      style={{ width: `${test.userScore}%` }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleStartTest(test._id)}
                    className="w-full rounded-xl border-gray-200 h-11"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                  <Button
                    onClick={() => handleStartTest(test._id)}
                    className="w-full rounded-xl h-11 font-bold"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" /> Start Test
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border-2 border-[#d1aff7] bg-[#E9D4FF]/20 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#AD46FF] flex items-center justify-center shadow-sm shrink-0">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-6 flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Why Take Psychometric Tests?
              </h3>
              <div className="grid gap-4">
                {[
                  "Discover your natural cognitive strengths and abilities",
                  "Get personalized career recommendations based on your results",
                  "Stand out to employers with verified test scores on your profile"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-purple-900" />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
          score={percentageScore}
          correctCount={score}
          totalCount={totalQuestionsCount}
          activeTest={activeTest}
          onTryAgain={() => handleStartTest(activeTest!._id)}
          onBackToDashboard={() => {
            refetchMyAnswers();
            setCurrentView("psychometricUI");
          }}
        />
      )}
    </>
  );
};

export default PsychometricAssessment;
