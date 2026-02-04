'use client'

import { useParams, useRouter } from 'next/navigation'

import { CheckCircle2, AlertCircle, Lightbulb, ArrowRight, BookOpen } from 'lucide-react'
import { WrittenAiAssessmentApiResponse } from '../../_components/written-assessment-data-type'
import { useQuery } from '@tanstack/react-query'
// import Footer from '../../_components/footer'
// import Navbar from '../../_components/navbar'



const resultsData = {
  'case-study': {
    title: 'Written Assessment',
    subject: 'Brief Email About A Recent Client Case Study',
    score: 75,
    totalScore: 100,
    program: 'Artisan Project Management Degree Apprenticeship',
    metrics: [
      { label: 'Words Completed', value: '250/300', progress: 83 },
      { label: 'Completion Rate', value: '95%', progress: 95 },
      { label: 'Writing Speed', value: '90%', progress: 90 },
      { label: 'Overall Grade', value: 'C', progress: 65 },
    ],
    feedback: [
      {
        type: 'positive',
        text: 'Great use of specific examples and metrics in your answers',
      },
      {
        type: 'positive',
        text: 'Your answers followed the STAR method effectively',
      },
      {
        type: 'neutral',
        text: 'Try to be more concise - aim for 1-2 minute responses',
      },
      {
        type: 'neutral',
        text: 'Consider adding more details about team collaboration',
      },
    ],
    tips: [
      {
        title: 'Use the STAR Method',
        description: 'Structure your answers with Situation, Task, Action, Result',
      },
      {
        title: 'Practice Out in Papers',
        description: 'Speaking your answers helps build confidence and fluency',
      },
      {
        title: 'Be Specific',
        description: 'Use concrete examples and quantify your achievements',
      },
      {
        title: 'Time Management',
        description: 'Keep answers concise, aim for 1-2 minutes per response',
      },
    ],
  },
  'presentation': {
    title: 'Written Presentation Task',
    subject: 'Market Analysis and Strategic Recommendations',
    score: 85,
    totalScore: 100,
    program: 'Business Strategy Program',
    metrics: [
      { label: 'Content Quality', value: '88%', progress: 88 },
      { label: 'Structure', value: '85%', progress: 85 },
      { label: 'Clarity', value: '82%', progress: 82 },
      { label: 'Overall Grade', value: 'B+', progress: 85 },
    ],
    feedback: [
      {
        type: 'positive',
        text: 'Excellent analysis of market trends',
      },
      {
        type: 'positive',
        text: 'Well-structured presentation with clear takeaways',
      },
      {
        type: 'neutral',
        text: 'Add more visual elements to enhance engagement',
      },
    ],
    tips: [
      {
        title: 'Data Visualization',
        description: 'Use charts and graphs to present complex information',
      },
      {
        title: 'Storytelling',
        description: 'Connect data points to create a compelling narrative',
      },
      {
        title: 'Practice Delivery',
        description: 'Rehearse your presentation multiple times',
      },
    ],
  },
  'email-exercise': {
    title: 'In-Tray Email Exercise',
    subject: 'Email Management Under Pressure',
    score: 92,
    totalScore: 100,
    program: 'Office Management Training',
    metrics: [
      { label: 'Prioritization', value: '95%', progress: 95 },
      { label: 'Response Quality', value: '90%', progress: 90 },
      { label: 'Time Management', value: '88%', progress: 88 },
      { label: 'Overall Grade', value: 'A', progress: 92 },
    ],
    feedback: [
      {
        type: 'positive',
        text: 'Excellent email prioritization strategy',
      },
      {
        type: 'positive',
        text: 'Professional and clear communication in all responses',
      },
      {
        type: 'neutral',
        text: 'Consider addressing stakeholder concerns more proactively',
      },
    ],
    tips: [
      {
        title: 'Priority Matrix',
        description: 'Use urgency vs importance to categorize emails',
      },
      {
        title: 'Template Responses',
        description: 'Prepare templates for common email types',
      },
      {
        title: 'Delegation',
        description: 'Know when to forward emails to appropriate teams',
      },
    ],
  },
  'law-summary': {
    title: 'Case Law Summary',
    subject: 'Legal Case Analysis and Key Principles',
    score: 88,
    totalScore: 100,
    program: 'Legal Studies Program',
    metrics: [
      { label: 'Legal Accuracy', value: '92%', progress: 92 },
      { label: 'Analysis Depth', value: '85%', progress: 85 },
      { label: 'Conciseness', value: '87%', progress: 87 },
      { label: 'Overall Grade', value: 'A-', progress: 88 },
    ],
    feedback: [
      {
        type: 'positive',
        text: 'Strong legal analysis and interpretation',
      },
      {
        type: 'positive',
        text: 'Well-identified key legal principles',
      },
      {
        type: 'neutral',
        text: 'Include more case law references to strengthen your analysis',
      },
    ],
    tips: [
      {
        title: 'Case Citation',
        description: 'Always cite relevant cases and statutes',
      },
      {
        title: 'Precedent Analysis',
        description: 'Compare with similar landmark cases',
      },
      {
        title: 'Implications',
        description: 'Discuss potential future impacts of the judgment',
      },
    ],
  },
}

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()

  const assessmentId = params.id as string

  console.log(assessmentId)
  // const data = resultsData[assessmentId as keyof typeof resultsData] || resultsData['case-study']



    // written case study get api
    const { data, isLoading, isError } =
    useQuery<WrittenAiAssessmentApiResponse>({
      queryKey: ["written-case-study", assessmentId],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/${assessmentId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invitations");
        }

        return res.json();
      },
    });

    console.log(data)

    const writtentData = data?.data

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
                AI Assessment Result 🎉
              </h1>
              <p className="text-muted-foreground">
                Great job! Here's how you performed in this Written Case Study session.
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 border border-foreground text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Case Study
            </button>
          </div>

          {/* Score Box */}
          <div className="bg-black rounded-lg p-6 mb-8 flex items-start gap-4 border-l-4 border-primary">
            <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary mb-1">Assessment Subject</p>
              <h2 className="text-xl font-bold text-white">Brief Email About A Recent Client Case Study</h2>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-4xl font-bold text-primary">{writtentData?.totalScore}</p>
              <p className="text-sm text-white">/100</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className=" mb-8 bg-white p-6 border border-[#F4F4F5] rounded-[12px]">
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Written assessment</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Artoon Project Management Degree Apprenticeship</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Words Completed</span>
                  <span className="text-sm font-semibold text-foreground">{writtentData?.wordsCompleted || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${writtentData?.wordsCompleted}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Completion Rate</span>
                  <span className="text-sm font-semibold text-foreground">{writtentData?.completionRate || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${writtentData?.completionRate}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Writing Speed</span>
                  <span className="text-sm font-semibold text-foreground">{writtentData?.writingSpeed || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${writtentData?.writingSpeed}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Overall Grade</span>
                  <span className="text-sm font-semibold text-foreground">{writtentData?.overallGrade || ""}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${writtentData?.overallGrade}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Feedback & Recommendations */}
          <div className="bg-yellow-100 rounded-lg p-6 mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-foreground" />
              <h3 className="font-semibold text-foreground">AI Feedback & Recommendations</h3>
            </div>

               <ul className="space-y-3">
              {writtentData?.recommendations?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

             <ul className="space-y-3">
              {writtentData?.recommendations?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Success Tips */}
          <div className="bg-white border border-border rounded-lg p-6 mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-foreground" />
              <h3 className="font-semibold text-foreground">
                Written Case Study Success Tips Success Tips
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {writtentData?.successTips?.map((tip, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">{tip}</h4>
                  </div>
                  {/* <p className="text-sm text-muted-foreground ml-7">{tip.description}</p> */}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-yellow-400 rounded-lg p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-black mx-auto" />
            <h2 className="text-3xl font-bold text-black">Ready to Participate again?</h2>
            <p className="text-black/80 max-w-2xl mx-auto">
              Watch your recorded responses, get detailed feedback on each question and see full analysis
              of your body language and communication
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 bg-black text-primary font-semibold px-6 py-3 rounded-lg hover:bg-black/90 transition-colors"
            >
              Start AI Assessment
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
