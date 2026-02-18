// 'use client'

// import { useParams, useRouter } from 'next/navigation'

// import { CheckCircle2, Check, AlertCircle, Lightbulb, FileText, ArrowRight, BookOpen, FileCheck } from 'lucide-react'
// import { useQuery } from '@tanstack/react-query'
// import { PresentationTaskApiResponse } from '../../../_components/written-presentation-data-type'

// export default function ResultsPage() {
//   const params = useParams()
//   const router = useRouter()

//   const assessmentId = params.id as string

//   console.log(assessmentId)



//   // written case study get api
//   const { data, isLoading, isError } =
//     useQuery<PresentationTaskApiResponse>({
//       queryKey: ["written-presentation", assessmentId],
//       queryFn: async () => {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${assessmentId}`
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch invitations");
//         }

//         return res.json();
//       },
//     });

//   console.log(data)

//   const presentationData = data?.data

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* <Navbar /> */}

//       <main className="flex-1">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-8">
//             <div className="space-y-2">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] flex items-center gap-2">
//                 Assessment Suite Result  🎉
//               </h1>
//               <p className="text-[#4A5565] font-normal font-sm md:text-base">
//                 Great job! Here's how you performed in this Written Case Study session.
//               </p>
//             </div>
//             <button
//               onClick={() => router.push('/dashboard/ai-assessment-centre')}
//               className="bg-[#FFFF00] rounded-[16px] px-4 py-2 border-[2px] border-[#131313] text-[#131313] font-bold hover:bg-muted transition-colors"
//             >
//               Case Study
//             </button>
//           </div>

//           {/* Score Box */}
//           <div className="bg-[#18181B] rounded-[12px] p-6 mb-8 flex items-start justify-between gap-4 border-l-4 border-[#FFFF00]">


//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileText className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-[#FFFF00] mb-1">Assessment Subject</p>
//                 <h2 className="text-base font-medium text-white">Brief Email About A Recent Client Case Study</h2>
//               </div>
//             </div>

//             <div className="bg-[#27272A] border border-[#3F3F46] rounded-[12px] py-2 px-4 text-right flex">
//               <p className="text-xl md:text-2xl font-bold text-white">{presentationData?.totalScore} </p>
//               <sub className="text-sm text-white"> /100</sub>
//             </div>
//           </div>

//           {/* Metrics Grid */}
//           <div className=" mb-8 bg-white p-6 border border-[#F4F4F5] rounded-[12px]">

//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileText className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-base md:text-lg font-bold text-[#18181B] mb-[2px]">Written assessment</p>
//                 <h2 className="text-sm font-medium text-[#71717A]">Artoon Project Management Degree Apprenticeship</h2>
//               </div>
//             </div>

//             <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Words Completed</span>
//                   <span className="text-sm font-bold text-[#18181B]">{presentationData?.wordsCompleted || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-2">
//                   <div
//                     className="bg-[#FFFF00] h-2 rounded-full transition-all"
//                     style={{ width: `${presentationData?.wordsCompleted}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Completion Rate</span>
//                   <span className="text-sm font-bold text-[#18181B]">{presentationData?.completionRate || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-2">
//                   <div
//                     className="bg-[#FFFF00] h-2 rounded-full transition-all"
//                     style={{ width: `${presentationData?.completionRate}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Writing Speed</span>
//                   <span className="text-sm font-bold text-[#18181B]">{presentationData?.writingSpeed || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-2">
//                   <div
//                     className="bg-[#FFFF00] h-2 rounded-full transition-all"
//                     style={{ width: `${presentationData?.writingSpeed}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Overall Grade</span>
//                   <span className="text-sm font-bold text-[#18181B]">{presentationData?.overallGrade || ""}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-2">
//                   <div
//                     className="bg-[#FFFF00] h-2 rounded-full transition-all"
//                     style={{ width: `${presentationData?.overallGrade}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* AI Feedback & Recommendations */}
//           <div className="bg-[#FEFCE8] rounded-[12px] p-6 mb-8 space-y-4">
//             <div className="flex items-center gap-2">
//               <Lightbulb className="w-5 h-5 text-foreground" />
//               <h3 className="text-base font-bold text-[#18181B]">AI Feedback & Recommendations</h3>
//             </div>

//             <ul className="space-y-3">
//               {presentationData?.feedback?.map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <span className="text-[#27272A] font-normal text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <ul className="space-y-3">
//               {presentationData?.recommendations?.map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <span className="text-[#27272A] font-normal text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Success Tips */}
//           <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-[12px] p-6 mb-8 space-y-4">
//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <Lightbulb className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-base font-bold text-[#18181B]">Written Case Study Success Tips Success Tips</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {presentationData?.successTips?.map((tip, idx) => (
//                 <div key={idx} className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Check  className="w-5 h-5 text-[#FFFF00] flex-shrink-0" />
//                     <h4 className="font-bold text-[#18181B] text-sm">{tip}</h4>
//                   </div>
//                   {/* <p className="text-sm text-muted-foreground ml-7">{tip.description}</p> */}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="bg-gradient-to-r from-[#FFFF00] to-[#828200] rounded-[16px] p-6 md:p-8 lg:p-12 text-center space-y-4">
//            <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileCheck  className="text-[#0A0A0A]" />
//               </div>
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Ready to Participate again?</h2>
//             <p className="text-[#FFFFE6] font-normal text-sm md:text-base max-w-2xl mx-auto">
//               Watch your recorded responses, get detailed feedback on each question and see full analysis
//               of your body language and communication
//             </p>
//             <button
//               onClick={() => router.push('/dashboard/ai-assessment-centre')}
//               className="inline-flex items-center gap-2 bg-[#FACC15] text-sm text-black font-semibold px-3 md:px-5 lg:px-6 py-3 rounded-[12px] "
//             >
//               Start Assessment Center Suite
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* <Footer /> */}
//     </div>
//   )
// }



'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2,
  Lightbulb,
  PlayCircle,
  ChevronRight,
  Trophy,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface PresentationTaskData {
  totalScore: number;
  completionRate: number;
  wordsCompleted: number;
  writingSpeed: number;
  overallGrade: string;
  feedback: string[];
  successTips: string[];
  recommendations: string[];
  aiassigmentId?: {
    title: string;
    description?: string;
  };
  // ... other fields if needed
}

const RadialProgress = ({ value, label }: { value: number; label: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center justify-between p-6 bg-[#FFFFF0] rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">{label}</h3>
      <div className="relative flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#A3B12D"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-semibold text-gray-600">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="max-w-5xl p-6 mx-auto space-y-6 animate-pulse">
    <div className="w-full h-16 bg-gray-200 rounded-lg" />
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="h-64 bg-gray-50 rounded-xl" />
      <div className="h-64 bg-gray-50 rounded-xl" />
    </div>
  </div>
);

export default function PresentationResultsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery<{ data: PresentationTaskData }>({
    queryKey: ['presentation-task', id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${id}`
      );
      if (!res.ok) throw new Error('Failed to fetch presentation result');
      return res.json();
    },
  });

  if (isLoading) return <Skeleton />;
  if (!data?.data) {
    return (
      <div className="p-10 text-center text-gray-500">
        No presentation result found.
      </div>
    );
  }

  const pd = data.data;

  // Normalize values for radial progress (0-100)
  const wordsProgress = Math.min(Math.round((pd.wordsCompleted / 300) * 100), 100); // assuming ~300 words target
  const writingSpeedScore = Math.min(pd.writingSpeed ?? 0, 100);

  return (
    <div className="space-y-8 pb-12  container mx-auto px-4 md:px-6 py-10">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-white p-5 md:p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Trophy className="w-6 h-6 text-gray-300" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Presentation Task
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {pd.totalScore || 0}/100
            </h2>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Grade</div>
          <div className="text-2xl font-bold">{pd.overallGrade || '—'}</div>
        </div>
      </div>

      

      {/* Score Breakdown Section */}
<div className="p-8 border border-gray-200 rounded-2xl bg-white">
  <div className="flex items-center gap-2 mb-6">
    <div className="bg-gray-100 p-1.5 rounded text-gray-600">
      <FileText size={18} />
    </div>

    <div>
      <h2 className="text-xl font-bold leading-tight text-gray-900">
        Performance Breakdown
      </h2>

      <p className="text-xs font-medium text-gray-500">
        {pd.aiassigmentId?.title || "Written Presentation Task"}
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <RadialProgress
      label="Total Score"
      value={pd.totalScore || 0}
    />

    <RadialProgress
      label="Completion Rate"
      value={pd.completionRate || 0}
    />

    <RadialProgress
      label="Word Count Progress"
      value={wordsProgress}
    />

    <RadialProgress
      label="Writing Speed"
      value={writingSpeedScore}
    />
  </div>
</div>


      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Observations / Strengths */}
        <div className="bg-[#F0F9F4] border border-[#B7E4C7] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5 text-[#2D6A4F]">
            <CheckCircle2 size={22} />
            <h3 className="text-xl font-bold">Positive Observations</h3>
          </div>
          <div className="space-y-4 text-sm text-[#2D6A4F]">
            {pd.feedback?.some(f => f.toLowerCase().includes('good') || f.toLowerCase().includes('strong') || f.toLowerCase().includes('well')) ? (
              pd.feedback
                .filter(f => !f.toLowerCase().includes('not') && !f.toLowerCase().includes('improve') && !f.toLowerCase().includes('lack'))
                .map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))
            ) : (
              <p className="italic opacity-80">
                No specific positive observations were highlighted in this submission.
              </p>
            )}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-[#FFF5F2] border border-[#FAD2C0] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5 text-[#94412D]">
            <Lightbulb size={22} />
            <h3 className="text-xl font-bold">Areas for Improvement</h3>
          </div>
          <div className="space-y-4 text-sm text-[#94412D]">
            {pd.feedback?.length > 0 ? (
              pd.feedback.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <AlertCircle size={16} className="shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="italic">No detailed feedback available at this time.</p>
            )}
          </div>
        </div>
      </div>

      {/* Success Tips */}
      {pd.successTips?.length > 0 && (
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-400 p-2.5 rounded-lg">
              <Lightbulb className="text-gray-900" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Tips to Improve Your Next Presentation
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pd.successTips.map((tip, i) => (
              <div key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 size={16} className="shrink-0 mt-1 text-green-600" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#E6E905] to-[#8C931B] rounded-3xl p-10 md:p-12 text-center space-y-6 shadow-xl">
        <div className="flex justify-center">
          <PlayCircle className="w-14 h-14 text-gray-900 opacity-90" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Ready to Improve?
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg font-medium text-gray-800">
          Submit a new written presentation, get fresh AI analysis, and track your progress over time.
        </p>
        <button
          onClick={() => router.push('/dashboard/ai-assessment-centre')}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white font-bold text-gray-900 rounded-2xl shadow hover:bg-gray-50 transition-colors text-lg"
        >
          Start New Presentation Task
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}