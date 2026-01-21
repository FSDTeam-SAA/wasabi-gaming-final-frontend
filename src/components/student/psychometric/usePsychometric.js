// src/components/psychometric/hooks/usePsychometric.js
import { useState } from "react";
import { psychometricData } from "./data";

export const usePsychometric = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);



  const handleStartTest = (testId) => {
    const test = psychometricData.tests.find((t) => t.id === testId);
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setCurrentView("test");
  };

  const handleAnswerSelect = (value) => setSelectedAnswer(value);

  const handleNext = () => {
    if (selectedAnswer === null) return;
    setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
    setSelectedAnswer(null);
    if (currentQuestion < activeTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentView("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateScore = () => {
    if (!activeTest) return 0;
    let correct = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === activeTest.questions[key].correctAnswer) correct++;
    });
    return Math.round((correct / activeTest.questions.length) * 100);
  };

  const goToDashboard = () => setCurrentView("dashboard");

  return {
    currentView,
    activeTest,
    currentQuestion,
    answers,
    selectedAnswer,
    psychometricData,
    handleStartTest,
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    calculateScore,
    goToDashboard,
  };
};
