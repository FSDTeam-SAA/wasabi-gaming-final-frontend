"use client";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";

interface Answer {
  questionIndex: number;
  question: string;
  videoUrl: string;
  timestamp: string;
  submitted: boolean;
}

interface Question {
  questionText: string;
  order: number;
}

interface SessionData {
  _id: string;
  category: string;
  questions: Question[];
  // ... other properties
}

interface InterviewProps {
  sessionData: SessionData | null;
  onBack: () => void;
}

const Interview: React.FC<InterviewProps> = ({ sessionData, onBack }) => {
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  // State management
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [prepTimer, setPrepTimer] = useState<number>(20);
  const [autoStartTimer, setAutoStartTimer] = useState<number>(28);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isVideoRecorded, setIsVideoRecorded] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(96);
  const [apiError, setApiError] = useState<string | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoStartTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sessionId = sessionData?._id || "";
  const questions: Question[] = sessionData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Start camera function
  const startCamera = async (): Promise<MediaStream | null> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices API is not supported in this browser");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(console.error);
      }

      return stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Camera access failed. Please allow camera and microphone permissions.",
      );
      return null;
    }
  };

  // Validate video file
  const isValidVideoFile = (blob: Blob | null): boolean => {
    return !!blob && blob.type.startsWith("video/");
  };

  // Save answer to server
  const saveAnswer = async (videoUrl: string, blob: Blob) => {
    if (!isValidVideoFile(blob)) {
      console.error("Invalid video file");
      setApiError("Invalid video file format");
      return;
    }

    if (!sessionId) {
      console.error("No session ID");
      setApiError("Session ID is missing");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Create FormData
      const formData = new FormData();

      formData.append(
        "videoPath",
        blob,
        `question-${currentQuestionIndex + 1}.webm`,
      );
      formData.append("sessionId", sessionId);
      formData.append("questionIndex", currentQuestionIndex.toString());
      formData.append("question", currentQuestion?.questionText || "");
      formData.append("segment", `question-${currentQuestionIndex + 1}`);

      // Save answer locally
      const answer: Answer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion?.questionText || "",
        videoUrl: videoUrl,
        timestamp: new Date().toISOString(),
        submitted: false, // Initially false, will be true after successful API call
      };

      // Send to server
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiUrl) {
        throw new Error("API base URL is not configured");
      }

      const response = await fetch(
        `${apiUrl}/mock-interview-session/start-interview`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to save answer:", result.message);
        throw new Error(result.message || "Failed to save answer");
      }

      console.log("Answer saved successfully:", result);

      // Update answer with submitted flag
      answer.submitted = true;

      setAnswers((prev) => {
        const newAnswers = [...prev];
        const existingIndex = newAnswers.findIndex(
          (a) => a.questionIndex === currentQuestionIndex,
        );
        if (existingIndex >= 0) {
          newAnswers[existingIndex] = answer;
        } else {
          newAnswers.push(answer);
        }
        return newAnswers;
      });

      // Update progress based on answers
      const newProgress = Math.min(96 + (currentQuestionIndex + 1) * 2, 100);
      setProgress(newProgress);
    } catch (error) {
      console.error("Error saving answer:", error);
      setApiError(
        error instanceof Error ? error.message : "Failed to save answer",
      );

      // Keep answer but mark as not submitted
      const answer: Answer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion?.questionText || "",
        videoUrl: videoUrl,
        timestamp: new Date().toISOString(),
        submitted: false,
      };

      setAnswers((prev) => {
        const newAnswers = [...prev];
        const existingIndex = newAnswers.findIndex(
          (a) => a.questionIndex === currentQuestionIndex,
        );
        if (existingIndex >= 0) {
          newAnswers[existingIndex] = answer;
        } else {
          newAnswers.push(answer);
        }
        return newAnswers;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start recording function
  const startRecording = async () => {
    // Clear all timers
    if (prepTimerRef.current) {
      clearInterval(prepTimerRef.current);
      prepTimerRef.current = null;
    }
    if (autoStartTimerRef.current) {
      clearInterval(autoStartTimerRef.current);
      autoStartTimerRef.current = null;
    }

    // Start camera if not already started
    if (!streamRef.current) {
      const stream = await startCamera();
      if (!stream) return;
    }

    if (!streamRef.current) {
      console.error("No stream available");
      return;
    }

    // Check if MediaRecorder is supported
    if (!window.MediaRecorder) {
      alert("MediaRecorder API is not supported in this browser");
      return;
    }

    // Setup media recorder
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "";

    if (!mimeType) {
      alert("No supported video format found");
      return;
    }

    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: mimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          if (chunksRef.current.length === 0) {
            console.error("No video data recorded");
            setApiError("No video data recorded");
            return;
          }

          // Create video blob
          const blob = new Blob(chunksRef.current, {
            type: mimeType,
          });

          // Validate blob
          if (!isValidVideoFile(blob)) {
            console.error("Invalid video blob");
            setApiError("Invalid video format");
            return;
          }

          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoUrl(videoUrl);
          setIsVideoRecorded(true);

          // Set video for playback
          if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.src = videoUrl;
            videoRef.current.muted = false;
            videoRef.current.controls = true;
            videoRef.current.load();
          }

          // Save the recorded answer
          await saveAnswer(videoUrl, blob);
        } catch (error) {
          console.error("Error processing recording:", error);
          setApiError("Error processing recording");
        }
      };

      // Start recording
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 119) {
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      setApiError("Error starting recording");
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      } catch (error) {
        console.error("Error stopping recording:", error);
        setApiError("Error stopping recording");
      }
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Reset states for next question
      setCurrentQuestionIndex((prev) => prev + 1);
      resetRecordingState();
    } else {
      // All questions completed
      handleInterviewComplete();
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      resetRecordingState();

      // Load previous answer if exists
      const prevAnswer = answers.find(
        (a) => a.questionIndex === currentQuestionIndex - 1,
      );
      if (prevAnswer) {
        setRecordedVideoUrl(prevAnswer.videoUrl);
        setIsVideoRecorded(true);
      }
    }
  };

  // Reset recording state
  const resetRecordingState = () => {
    setIsRecording(false);
    setIsCameraActive(false);
    setIsVideoRecorded(false);
    setRecordedVideoUrl(null);
    setRecordingTime(0);
    setPrepTimer(20);
    setAutoStartTimer(28);
    setApiError(null);

    // Clear timers
    if (prepTimerRef.current) {
      clearInterval(prepTimerRef.current);
      prepTimerRef.current = null;
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (autoStartTimerRef.current) {
      clearInterval(autoStartTimerRef.current);
      autoStartTimerRef.current = null;
    }

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
      videoRef.current.controls = false;
    }

    // Restart timers
    setupAutoTimers();
  };

  // Handle retake recording
  const handleRetake = () => {
    resetRecordingState();
  };

  // Handle interview completion
  const handleInterviewComplete = () => {
    const submittedCount = answers.filter((a) => a.submitted).length;
    alert(
      `Interview completed! ${submittedCount} of ${questions.length} responses have been recorded successfully.`,
    );
  };

  // Setup auto timers
  const setupAutoTimers = () => {
    // Clear any existing timers first
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (autoStartTimerRef.current) clearInterval(autoStartTimerRef.current);

    // Preparation timer
    prepTimerRef.current = setInterval(() => {
      setPrepTimer((prev) => {
        if (prev <= 1) {
          if (prepTimerRef.current) {
            clearInterval(prepTimerRef.current);
            prepTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto start recording timer
    autoStartTimerRef.current = setInterval(() => {
      setAutoStartTimer((prev) => {
        if (prev <= 1) {
          if (autoStartTimerRef.current) {
            clearInterval(autoStartTimerRef.current);
            autoStartTimerRef.current = null;
          }
          if (!isRecording && !isVideoRecorded) {
            startRecording();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Initialize timers
  useEffect(() => {
    setupAutoTimers();

    return () => {
      // Cleanup timers
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (autoStartTimerRef.current) clearInterval(autoStartTimerRef.current);

      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentQuestionIndex]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle manual recording start
  const handleStartRecording = () => {
    startRecording();
    setPrepTimer(20);
    setAutoStartTimer(28);
  };

  // Check if current question has been answered
  const isCurrentQuestionAnswered = answers.some(
    (a) => a.questionIndex === currentQuestionIndex && a.submitted,
  );

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
          No session data found. Please start again.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 mt-4 text-blue-500 transition border border-blue-500 rounded-lg hover:bg-blue-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-sans text-[#444]">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{sessionData.category}</h1>
          <p className="text-sm text-gray-600">
            Session ID: {sessionId?.slice(-8) || "N/A"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ← Back
          </button>

          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {questions.map((q: Question, idx: number) => {
          const isAnswered = answers.some(
            (a) => a.questionIndex === idx && a.submitted,
          );
          const isCurrent = idx === currentQuestionIndex;

          return (
            <button
              key={idx}
              onClick={() => {
                if (idx !== currentQuestionIndex) {
                  setCurrentQuestionIndex(idx);
                  resetRecordingState();
                }
              }}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-2 ${
                isCurrent
                  ? "bg-[#FAFF00] font-bold shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${isAnswered ? "border-2 border-green-500" : ""}`}
            >
              Q{idx + 1}
              {isAnswered && <span className="text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      {apiError && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-lg">
          <p className="font-medium">Error: {apiError}</p>
          <p className="mt-1 text-sm">
            Please try recording again or contact support if the issue persists.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* LEFT PANEL - PREPARATION & RECORDING AREA */}
        <div className="lg:w-[60%] border-[3px] border-[#FAFF00] rounded-2xl p-6 flex flex-col justify-between relative">
          <div className="flex-grow flex flex-col items-center justify-center bg-[#CCCCCC] rounded-2xl text-center relative overflow-hidden min-h-[500px]">
            {/* Video element */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isCameraActive || isVideoRecorded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Recording overlay - Centered properly */}
            {isRecording && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                <div className="max-w-md p-8 mx-4 text-center text-white bg-black/80 rounded-2xl">
                  <div className="mb-4 text-4xl animate-pulse">
                    ⏺️ RECORDING
                  </div>
                  <div className="mb-4 text-6xl font-bold">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="mb-6 text-lg opacity-90">Max 2:00</div>
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 font-bold text-white transition-all bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    ⏹️ Stop Recording
                  </button>
                </div>
              </div>
            )}

            {/* Default content */}
            {!isCameraActive && !isVideoRecorded && !isRecording && (
              <div className="z-10 p-6">
                <div className="mb-6 text-4xl">🧠</div>
                <h2 className="serif-font text-2xl font-bold mb-3 text-[#333]">
                  Prepare Your Answer
                </h2>
                <p className="text-sm mb-10 text-[#555] max-w-md">
                  Read the question and think about your response
                </p>

                <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center rounded-full border-[8px] border-[#FAFF00]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#FAFF00]">
                      {progress}%
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm serif-font italic text-[#555]">
                  Recording starts automatically in {prepTimer}s
                </p>
              </div>
            )}

            {/* Camera active but not recording */}
            {isCameraActive && !isRecording && !isVideoRecorded && (
              <div className="z-10 max-w-md p-8 text-white bg-black/80 rounded-2xl">
                <div className="mb-4 text-4xl">📹 Camera Ready</div>
                <p className="mb-8 text-lg">
                  Click below to start recording your answer
                </p>
              </div>
            )}

            {/* Video recorded */}
            {isVideoRecorded && !isRecording && (
              <div className="z-10 max-w-md p-8 text-white bg-black/80 rounded-2xl">
                <div className="mb-4 text-4xl">✅ Recording Complete!</div>
                <p className="mb-6 text-lg">
                  Your {formatTime(recordingTime)} response has been recorded
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      if (recordedVideoUrl) {
                        const a = document.createElement("a");
                        a.href = recordedVideoUrl;
                        a.download = `question-${currentQuestionIndex + 1}.webm`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }}
                    className="flex items-center gap-2 px-5 py-3 transition bg-green-600 rounded-lg hover:bg-green-700"
                    disabled={!recordedVideoUrl}
                  >
                    <span>💾</span> Download
                  </button>
                  <button
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-5 py-3 transition rounded-lg bg-amber-500 hover:bg-amber-600"
                  >
                    <span>🔄</span> Retake
                  </button>
                </div>
                {isSubmitting && (
                  <p className="mt-4 text-sm text-blue-300">
                    Saving your answer to server...
                  </p>
                )}
              </div>
            )}

            {/* Control buttons - Outside of overlays */}
            <div className="z-20 flex flex-col items-center gap-4 mt-6">
              {!isVideoRecorded && !isRecording && (
                <button
                  onClick={handleStartRecording}
                  className="flex items-center gap-3 px-8 py-4 bg-[#FAFF00] hover:bg-[#e6e600] text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                  disabled={isSubmitting}
                >
                  <span className="text-2xl">▶</span>
                  <span className="text-lg">Start Recording Now</span>
                </button>
              )}

              {isCameraActive && !isRecording && !isVideoRecorded && (
                <button
                  onClick={() => {
                    if (streamRef.current) {
                      streamRef.current
                        .getTracks()
                        .forEach((track) => track.stop());
                      streamRef.current = null;
                      setIsCameraActive(false);
                    }
                  }}
                  className="px-6 py-3 text-white transition bg-gray-700 rounded-lg hover:bg-gray-800"
                >
                  Close Camera
                </button>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between w-full max-w-md gap-2 mt-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-3 rounded-xl transition flex items-center gap-2 ${
                    currentQuestionIndex === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-700 text-white hover:bg-gray-800"
                  }`}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!isCurrentQuestionAnswered}
                  className={`px-6 py-3 rounded-xl transition flex items-center gap-2 ${
                    !isCurrentQuestionAnswered
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question →"
                    : "Complete Interview"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Status */}
          <div className="flex items-center gap-4 mt-6">
            <div className="p-3 text-white bg-black rounded-lg">
              {isRecording
                ? "⏺️"
                : isVideoRecorded
                  ? "✅"
                  : isCameraActive
                    ? "📹"
                    : "🎙️"}
            </div>
            <div>
              <h4 className="text-lg font-bold leading-none">
                {isRecording
                  ? "Recording..."
                  : isVideoRecorded
                    ? "Recording Complete"
                    : isCameraActive
                      ? "Camera Ready"
                      : "Ready"}
              </h4>
              <p className="text-sm italic text-gray-600">
                {isRecording
                  ? `${formatTime(recordingTime)} of 2:00`
                  : isVideoRecorded
                    ? "Your response has been recorded"
                    : isCameraActive
                      ? 'Click "Start Recording Now"'
                      : 'Click "Start to Begin Recording"'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - QUESTION & TIPS */}
        <div className="flex-1 border-[3px] border-[#FAFF00] rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h1 className="serif-font text-2xl md:text-3xl font-bold leading-tight mb-8 text-[#333]">
              {currentQuestion?.questionText || "Loading question..."}
            </h1>

            {/* Tips Box */}
            <div className="bg-[#E5E5E5] border border-black rounded-xl p-5 flex gap-4 mb-6">
              <div className="p-3 text-xs text-white bg-black rounded-lg h-fit">
                🎙️
              </div>
              <div>
                <h5 className="mb-3 font-bold">Quick Tips:</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Use STAR: Situation, Task, Action, Result
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">You have 2 min to answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Speak clearly and confidently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Structure your answer logically
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Preparation Box */}
            <div className="bg-[#E5E5E5] border border-black rounded-xl p-5 flex gap-4">
              <div className="p-3 text-xs text-white bg-black rounded-lg h-fit">
                🧠
              </div>
              <div className="w-full">
                <h5 className="mb-2 font-bold">Preparation Time:</h5>
                <p className="mb-3 text-sm italic">
                  {isRecording
                    ? "Recording in progress..."
                    : isVideoRecorded
                      ? "Recording completed!"
                      : `Think about your answer. ${isCameraActive ? "Ready to record" : `Recording starts in ${prepTimer}s`}`}
                </p>
                {/* Progress Bar */}
                <div className="w-full h-3 overflow-hidden bg-gray-300 rounded-full">
                  <div
                    className="bg-[#007185] h-full transition-all duration-300"
                    style={{
                      width: isRecording
                        ? `${(recordingTime / 120) * 100}%`
                        : isVideoRecorded
                          ? "100%"
                          : `${((20 - prepTimer) / 20) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="p-5 mt-8 border border-gray-200 bg-gray-50 rounded-xl">
              <h5 className="mb-3 font-bold">Progress Summary</h5>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-3 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full transition-all duration-500 bg-green-500"
                    style={{
                      width:
                        questions.length > 0
                          ? `${(answers.filter((a) => a.submitted).length / questions.length) * 100}%`
                          : "0%",
                    }}
                  ></div>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {answers.filter((a) => a.submitted).length} of{" "}
                  {questions.length} answered
                </span>
              </div>
              {isSubmitting && (
                <p className="flex items-center gap-2 text-sm text-blue-600">
                  <span className="animate-spin">⏳</span>
                  Saving your answer...
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleStartRecording}
              disabled={isRecording || isVideoRecorded || isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-sm transition-all ${
                isRecording || isVideoRecorded || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FFF34E] hover:brightness-95 active:scale-[0.98] hover:shadow-md"
              }`}
            >
              <span className="text-xl">▶</span>
              {isRecording
                ? "Recording..."
                : isVideoRecorded
                  ? "Recording Complete"
                  : isSubmitting
                    ? "Saving..."
                    : "Start Recording Now"}
            </button>
            <p className="mt-3 text-sm font-bold opacity-80">
              {isRecording
                ? `Recording... ${formatTime(recordingTime)} / 2:00`
                : isVideoRecorded
                  ? "You can download or retake your recording"
                  : `Or wait ${autoStartTimer}s for recording to start automatically`}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Font */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,600;0,700;1,400&display=swap");
        .serif-font {
          font-family: "Source Serif Pro", serif;
        }
      `}</style>
    </div>
  );
};

export default Interview;
