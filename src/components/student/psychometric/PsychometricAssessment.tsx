'use client'

import React, { useCallback, useState } from 'react'
import { psychometricData, PsychometricTest } from './data'
import { Card, ProgressBar } from './PsychometricUI'
import { Button } from '@/components/ui/button'
import Test from './TestInterface'
import Results from './Results'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  CheckCircle2,
  PlayCircle,
  Brain,
  BarChart,
  Lightbulb,
  Users,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const PsychometricAssessment = () => {
  const [currentView, setCurrentView] = useState<
    'psychometricUI' | 'test' | 'results'
  >('psychometricUI')
  const [activeTest, setActiveTest] = useState<PsychometricTest | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const getTestIcon = (name: string) => {
    if (name.includes('Verbal')) return <Brain className="w-6 h-6" />
    if (name.includes('Numerical')) return <BarChart className="w-6 h-6" />
    if (name.includes('Abstract')) return <Lightbulb className="w-6 h-6" />
    if (name.includes('Situational')) return <Users className="w-6 h-6" />
    return <Brain className="w-6 h-6" />
  }

  const handleStartTest = useCallback((testId: number) => {
    const test = psychometricData.tests.find(t => t.id === testId)
    if (!test) return
    setActiveTest(test)
    setCurrentQuestion(0)
    setAnswers({})
    setSelectedAnswer(null)
    setCurrentView('test')
  }, [])

  const handleAnswerSelect = useCallback((value: number) => {
    setSelectedAnswer(value)
  }, [])

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || !activeTest) return

    setAnswers(prev => ({ ...prev, [currentQuestion]: selectedAnswer }))
    setSelectedAnswer(null)

    if (currentQuestion < activeTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setCurrentView('results')
    }
  }, [activeTest, currentQuestion, selectedAnswer])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }, [currentQuestion, answers])

  const calculateScore = useCallback(() => {
    if (!activeTest || Object.keys(answers).length === 0) return 0
    let correct = 0
    Object.entries(answers).forEach(([idx, ans]) => {
      if (ans === activeTest.questions[Number(idx)].correctAnswer) correct++
    })
    return Math.round((correct / activeTest.questions.length) * 100)
  }, [activeTest, answers])

  const score = calculateScore()

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
          {psychometricData.tests.map(test => (
            <div
              key={test.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
                      test.status === 'completed'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-purple-100 text-purple-600',
                    )}
                  >
                    {getTestIcon(test.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {test.description}
                    </p>
                  </div>
                </div>
                {test.status === 'completed' ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-200 text-green-800 hover:bg-green-200 border border-green-300 px-3 py-1 font-medium rounded-full gap-1.5 shrink-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-yellow-800 border-yellow-300 bg-yellow-200 px-3 py-1 font-medium rounded-full shrink-0"
                  >
                    Available
                  </Badge>
                )}
              </div>

              {test.score !== null ? (
                <div className="space-y-4 mt-auto">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-gray-500">
                      Your Score
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {test.score}
                      <span className="text-gray-400 text-sm font-normal">
                        /100
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFFF00] rounded-full"
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleStartTest(test.id)}
                    className="w-full rounded-xl border-gray-200 h-11"
                  >
                    View Details & Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                  <Button
                    onClick={() => handleStartTest(test.id)}
                    className="w-full rounded-xl h-11 font-bold"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" /> Start Test
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="rounded-[20px] border-2 border-[#d1aff7] bg-[#E9D4FF]/20 p-8 shadow-sm relative overflow-hidden">
          {/* Decorative background blur if needed */}
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
                  'Discover your natural cognitive strengths and abilities',
                  'Get personalized career recommendations based on your results',
                  'Stand out to employers with verified test scores on your profile',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full  flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-purple-900" />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {currentView === 'psychometricUI' && <PsychometricDashboard />}
      {currentView === 'test' && (
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
      {currentView === 'results' && (
        <Results
          score={score}
          activeTest={activeTest}
          onTryAgain={() => handleStartTest(activeTest!.id)}
          onBackToDashboard={() => setCurrentView('psychometricUI')}
        />
      )}
    </>
  )
}

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
)

export default PsychometricAssessment
