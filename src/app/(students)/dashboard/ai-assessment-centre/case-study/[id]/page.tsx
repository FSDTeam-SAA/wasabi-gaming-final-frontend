
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// export default function CaseStudyPage() {
//   const [selectedParticipant, setSelectedParticipant] = useState('1');
//   const [summary, setSummary] = useState('');
//   const [wordCount, setWordCount] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);

//   const participants = [
//     { id: '1', name: 'William Stevenson', active: true },
//     { id: '2', name: 'Ethan Dickman', active: false },
//     { id: '3', name: 'Olivia Jackson', active: false },
//   ];

//   const handleSummaryChange = (text: string) => {
//     setSummary(text);
//     const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
//     setWordCount(count);
//   };

//   const handleSaveDraft = async () => {
//     setIsSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setIsSaving(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               {/* Participant Section */}
//               <div className="bg-white h-screen rounded-lg p-4 border border-[#FFFF00]">
//                 <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-4">
//                   Case Participants
//                 </h3>
//                 <div className="space-y-2">
//                   {participants.map((participant) => (
//                     <button
//                       key={participant.id}
//                       onClick={() => setSelectedParticipant(participant.id)}
//                       className={`w-full text-left px-4 py-3 rounded-[10px] font-semibold transition-all ${selectedParticipant === participant.id
//                           ? 'bg-[#FFFF00] text-[#1E1E1E]'
//                           : ' text-[#1E1E1E] hover:bg-[#FFFF00] hover:text-[#1E1E1E]'
//                         }`}
//                     >
//                       {participant.name}
//                     </button>
//                   ))}
//                   {/* Progress Section */}
//                   <div className="bg-white rounded-lg p-4 pt-10">
//                     <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-4">
//                       Progress
//                     </h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-[#374151]">Module Completion</span>
//                         <span className="text-sm font-bold text-gray-600">80%</span>
//                       </div>
//                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gray-700"
//                           style={{ width: '80%' }}
//                         />
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               </div>


//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-8">
//             {/* Header */}
//             <div className="space-y-3">
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold">Module 3</span>
//                 <span className="mx-2">•</span>
//                 <span className="font-semibold">Negligence</span>
//               </p>
//               <h1 className="text-4xl font-bold text-gray-900">Duty of Care Analysis</h1>
//               <p className="text-[#374151]">
//                 Review the precedent case below and apply the established legal principles to the fictional scenario.
//               </p>
//             </div>

//             {/* Case Sections */}
//             <div className="space-y-6">
//               {/* Precedent Summary Section */}
//               <div className="border-l-4 border-black bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-gray-900 font-bold">
//                       01
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-[#000000]">Precedent summary</h3>
//                       <p className="text-xs text-gray-500">Legal Precedent</p>
//                     </div>
//                   </div>

//                   <div className="space-y-10">
//                     {[
//                       {
//                         label: 'Facts :',
//                         value: 'Mrs Donoghue consumed ginger beer that contained a decomposed snail, which caused her to fall ill.',
//                       },
//                       {
//                         label: 'Issue :',
//                         value: 'Whether a manufacturer owes a duty of care to the ultimate consumer where there is no direct contract.',
//                       },
//                       {
//                         label: 'Holding :',
//                         value: 'The House of Lords recognised a duty of care owed to one\'s neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
//                       },
//                       {
//                         label: 'Principle :',
//                         value: 'A manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
//                       },
//                     ].map((item, index) => (
//                       <div key={index} className="flex gap-4">
//                         <span className="text-sm font-semibold text-gray-900 min-w-fit">{item.label}</span>
//                         <p className="text-sm text-[#374151]">{item.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Pretend Case Section */}
//               <div className="border-l-4 border-yellow-400 bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-yellow-400 font-bold text-lg">
//                       01
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">Pretend case (fictional)</h3>
//                       <p className="text-xs text-gray-500">Case Scenario</p>
//                     </div>
//                   </div>

//                   <div className="space-y-10">
//                     {[
//                       {
//                         label: 'Facts :',
//                         value: 'Mason bought a takeaway coffee, the lid was not secured, hot liquid spilled and caused burns. The drink was sold through a third-party distributor.',
//                       },
//                       {
//                         label: 'Issue :',
//                         value: 'Whether Fresh Brew owes a duty of care to Mason in these circumstances.',
//                       },
//                       {
//                         label: 'Key details :',
//                         value: 'The House of Lords recognised a duty of care owed to one\'s neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
//                       },
//                     ].map((item, index) => (
//                       <div key={index} className="flex gap-4">
//                         <span className="text-sm font-semibold text-gray-900 min-w-fit">{item.label}</span>
//                         <p className="text-sm text-[#374151]">{item.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Your Summary Section */}
//               <div className="border-t-8 border-yellow-400 bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold">
//                         01
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-900">Your Summary</h3>
//                         <p className="text-xs text-gray-500">Analysis & Application</p>
//                       </div>
//                     </div>
//                     <div className="text-xs font-bold text-[#374151] bg-[#FEFCE8] px-4 py-2 rounded-full border border-[#FACC15]">
//                       {wordCount} / 200 words
//                     </div>
//                   </div>

//                   {/* Instructions */}
//                   <div className="bg-[#FEFCE8] rounded-[12px] border border-[#FACC15] p-4 space-y-3">
//                     <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
//                       <span className="text-lg">ℹ️</span>
//                       Instructions
//                     </h4>
//                     <ul className="text-sm text-gray-800 space-y-2">
//                       <li>• Apply the Donoghue principle to Mason v Fresh Brew</li>
//                       <li>• State one argument for Mason, and one for Fresh Brew</li>
//                     </ul>
//                   </div>

//                   {/* Summary Textarea */}
//                   <Textarea
//                     value={summary}
//                     onChange={(e) => handleSummaryChange(e.target.value)}
//                     placeholder="Write your summary applying the principle here..."
//                     className="min-h-48 resize-none placeholder:text-[#CCCCCC] focus:ring-2 focus:ring-yellow-400 border-2 border-[#E5E7EB] rounded-[12px] shrink-0"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Action Button */}
//             <div className="flex justify-end pt-4">
//               <Button
//                 onClick={handleSaveDraft}
//                 disabled={isSaving}
//                 className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-2 text-base rounded-lg"
//               >
//                 {isSaving ? 'Saving...' : 'Save Draft'}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Loader2 } from 'lucide-react';

// interface CareAnalysis {
//   _id: string;
//   aiassigmentId: {
//     title: string;
//     discription: string;
//     type: string;
//     logo?: string;
//   };
//   precedentSummary: string;
//   pretendCase: string;
//   applicant: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     profileImage?: string;
//   };
//   caseLinking?: string;
//   legalIssue?: string;
//   summaryQuality?: string;
//   yourResponse?: string;
//   createdAt: string;
// }

// export default function CaseStudyPage() {
//   const { id } = useParams();
//   const { data: session } = useSession();
//   const token = session?.accessToken;

//   const [data, setData] = useState<CareAnalysis | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [summary, setSummary] = useState('');
//   const [wordCount, setWordCount] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);

//   // Participants list remains the same (static for now)
//   const participants = [
//     { id: '1', name: 'William Stevenson', active: true },
//     { id: '2', name: 'Ethan Dickman', active: false },
//     { id: '3', name: 'Olivia Jackson', active: false },
//   ];

//   const [selectedParticipant, setSelectedParticipant] = useState('1');

//   // Fetch data from API
//   useEffect(() => {
//     const fetchCaseAnalysis = async () => {
//       if (!id || !token) return;

//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch case analysis`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           setData(result.data);
//           // Optionally pre-fill the textarea if there's existing response
//           if (result.data.yourResponse) {
//             setSummary(result.data.yourResponse);
//           }
//         } else {
//           throw new Error(result.message || 'No data received');
//         }
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseAnalysis();
//   }, [id, token]);

//   const handleSummaryChange = (text: string) => {
//     setSummary(text);
//     const count = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
//     setWordCount(count);
//   };

//   const handleSaveDraft = async () => {
//     setIsSaving(true);
//     // Here you can implement actual save logic later
//     await new Promise((resolve) => setTimeout(resolve, 1200));
//     setIsSaving(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
//         <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//         <p className="text-gray-700">{error || 'Case not found'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Sidebar – exactly the same as your original */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               <div className="bg-white h-screen rounded-lg p-4 border border-[#FFFF00]">
//                 <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-4">
//                   Case Participants
//                 </h3>
//                 <div className="space-y-2">
//                   {participants.map((participant) => (
//                     <button
//                       key={participant.id}
//                       onClick={() => setSelectedParticipant(participant.id)}
//                       className={`w-full text-left px-4 py-3 rounded-[10px] font-semibold transition-all ${
//                         selectedParticipant === participant.id
//                           ? 'bg-[#FFFF00] text-[#1E1E1E]'
//                           : 'text-[#1E1E1E] hover:bg-[#FFFF00] hover:text-[#1E1E1E]'
//                       }`}
//                     >
//                       {participant.name}
//                     </button>
//                   ))}

//                   {/* Progress Section */}
//                   {/* <div className="bg-white rounded-lg p-4 pt-10">
//                     <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-4">
//                       Progress
//                     </h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-[#374151]">Module Completion</span>
//                         <span className="text-sm font-bold text-gray-600">80%</span>
//                       </div>
//                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-gray-700" style={{ width: '80%' }} />
//                       </div>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content – dynamic data from API */}
//           <div className="lg:col-span-3 space-y-8">
//             {/* Header */}
//             <div className="space-y-3">
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold">Case Analysis</span>
//                 <span className="mx-2">•</span>
//                 <span className="font-semibold">{data.aiassigmentId.type.replace('_', ' ')}</span>
//               </p>
//               <h1 className="text-4xl font-bold text-gray-900">
//                 {data.aiassigmentId.title || 'Duty of Care Analysis'}
//               </h1>
//               <p className="text-[#374151]">{data.aiassigmentId.discription}</p>
//             </div>

//             {/* Case Sections */}
//             <div className="space-y-6">
//               {/* Precedent Summary */}
//               <div className="border-l-4 border-black bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-gray-900 font-bold">
//                       01
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-[#000000]">Precedent summary</h3>
//                       <p className="text-xs text-gray-500">Legal Precedent</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-line">
//                     {data.precedentSummary}
//                   </p>
//                 </div>
//               </div>

//               {/* Pretend Case */}
//               <div className="border-l-4 border-yellow-400 bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-yellow-400 font-bold text-lg">
//                       02
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">Pretend case (fictional)</h3>
//                       <p className="text-xs text-gray-500">Case Scenario</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-line">
//                     {data.pretendCase}
//                   </p>
//                 </div>
//               </div>

//               {/* Your Summary / Analysis Section */}
//               <div className="border-t-8 border-yellow-400 bg-white rounded-[12px] overflow-hidden shadow-sm">
//                 <div className="p-6 space-y-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold">
//                         03
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-900">Your Summary</h3>
//                         <p className="text-xs text-gray-500">Analysis & Application</p>
//                       </div>
//                     </div>

//                     <div className="text-xs font-bold text-[#374151] bg-[#FEFCE8] px-4 py-2 rounded-full border border-[#FACC15]">
//                       {wordCount} / 200 words
//                     </div>
//                   </div>

//                   {/* Instructions */}
//                   <div className="bg-[#FEFCE8] rounded-[12px] border border-[#FACC15] p-4 space-y-3">
//                     <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
//                       <span className="text-lg">ℹ️</span>
//                       Instructions
//                     </h4>
//                     <ul className="text-sm text-gray-800 space-y-2 list-disc pl-5">
//                       <li>Apply the precedent principle to the pretend case</li>
//                       <li>State one argument for the claimant, and one for the defendant</li>
//                       <li>Keep your response clear and structured</li>
//                     </ul>
//                   </div>

//                   {/* Summary Textarea */}
//                   <Textarea
//                     value={summary}
//                     onChange={(e) => handleSummaryChange(e.target.value)}
//                     placeholder="Write your analysis and application here..."
//                     className="min-h-[180px] resize-none placeholder:text-[#CCCCCC] focus:ring-2 focus:ring-yellow-400 border-2 border-[#E5E7EB] rounded-[12px]"
//                   />

//                   {/* Optional: Show AI feedback if available */}
//                   {data.summaryQuality && (
//                     <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <h4 className="text-sm font-semibold mb-2">AI Feedback</h4>
//                       <p className="text-sm text-gray-700">{data.summaryQuality}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end pt-4 gap-4">
//               <Button
//                 variant="outline"
//                 disabled={isSaving}
//                 className="px-8 py-2"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSaveDraft}
//                 disabled={isSaving}
//                 className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-2 text-base rounded-lg"
//               >
//                 {isSaving ? 'Saving...' : 'Save Draft'}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CareAnalysis {
  _id: string;
  aiassigmentId: {
    title: string;
    discription: string;
    type: string;
    logo?: string;
  };
  precedentSummary: string;
  pretendCase: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  };
  caseLinking?: string;
  legalIssue?: string;
  summaryQuality?: string;
  yourResponse?: string;
  createdAt: string;
}

export default function CaseStudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken as string | undefined;

  const [data, setData] = useState<CareAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const MAX_WORDS = 200;

  // Participants – unchanged
  const participants = [
    { id: '1', name: 'William Stevenson', active: true },
    { id: '2', name: 'Ethan Dickman', active: false },
    { id: '3', name: 'Olivia Jackson', active: false },
  ];

  const [selectedParticipant, setSelectedParticipant] = useState('1');

  // Fetch case data
  useEffect(() => {
    if (!id || !token) return;

    const fetchCaseAnalysis = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        if (json.success && json.data) {
          setData(json.data);
          if (json.data.yourResponse) {
            setSummary(json.data.yourResponse);
          }
        } else {
          throw new Error(json.message || 'Invalid response');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load case analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseAnalysis();
  }, [id, token]);

  const handleSummaryChange = (text: string) => {
    setSummary(text);
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleSave = async () => {
    if (!summary.trim() || wordCount > MAX_WORDS || !id || !token || !data) return;

    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`, {
        method: 'PUT',          
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yourResponse: summary.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Save failed (${res.status})`);
      }

      // Success → redirect to result page
    //   router.push('/result');
     router.push(`/dashboard/case-study-result/${id}`);
    } catch (err: any) {
      alert('Failed to save: ' + (err.message || 'Unknown error'));
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 max-w-md">{error || 'Case not found'}</p>
        <Button variant="outline" className="mt-6" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const isOverLimit = wordCount > MAX_WORDS;
  const canSave = summary.trim().length > 0 && !isOverLimit && !isSaving;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar – unchanged */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg p-4 border border-[#FFFF00]">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-4">
                  Case Participants
                </h3>
                <div className="space-y-2">
                  {participants.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParticipant(p.id)}
                      className={`w-full text-left px-4 py-3 rounded-[10px] font-semibold transition-all ${
                        selectedParticipant === p.id
                          ? 'bg-[#FFFF00] text-[#1E1E1E]'
                          : 'text-[#1E1E1E] hover:bg-[#FFFF00]/80'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Case Analysis</span>
                <span className="mx-2">•</span>
                <span className="font-semibold">{data.aiassigmentId.type.replace('_', ' ')}</span>
              </p>
              <h1 className="text-4xl font-bold text-gray-900">
                {data.aiassigmentId.title || 'Duty of Care Analysis'}
              </h1>
              <p className="text-[#374151]">{data.aiassigmentId.discription}</p>
            </div>

            {/* Precedent */}
            <div className="border-l-4 border-black bg-white rounded-[12px] shadow-sm">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-gray-900 font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Precedent summary</h3>
                    <p className="text-xs text-gray-500">Legal Precedent</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.precedentSummary}
                </p>
              </div>
            </div>

            {/* Fictional Case */}
            <div className="border-l-4 border-yellow-400 bg-white rounded-[12px] shadow-sm">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-yellow-400 font-bold text-lg">
                    02
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Pretend case (fictional)</h3>
                    <p className="text-xs text-gray-500">Case Scenario</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.pretendCase}
                </p>
              </div>
            </div>

            {/* Your Analysis */}
            <div className="border-t-8 border-yellow-400 bg-white rounded-[12px] shadow-sm">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold">
                      03
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Your Summary</h3>
                      <p className="text-xs text-gray-500">Analysis & Application</p>
                    </div>
                  </div>

                  <div
                    className={`text-xs font-bold px-4 py-2 rounded-full border ${
                      isOverLimit
                        ? 'bg-red-50 text-red-700 border-red-300'
                        : 'bg-[#FEFCE8] text-[#374151] border-[#FACC15]'
                    }`}
                  >
                    {wordCount} / {MAX_WORDS} words
                  </div>
                </div>

                <div className="bg-[#FEFCE8] rounded-[12px] border border-[#FACC15] p-4 space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span className="text-lg">ℹ️</span>
                    Instructions
                  </h4>
                  <ul className="text-sm text-gray-800 space-y-1.5 list-disc pl-5">
                    <li>Apply the precedent principle to the pretend case</li>
                    <li>State one argument for the claimant, and one for the defendant</li>
                    <li>Keep your response clear and structured</li>
                  </ul>
                </div>

                <Textarea
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="Write your analysis and application here..."
                  className="min-h-[200px] resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 border-2 border-gray-200 rounded-xl"
                  disabled={isSaving}
                />

                {data.summaryQuality && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <h4 className="font-semibold mb-2 text-gray-800">Previous AI Feedback</h4>
                    <p className="text-gray-700">{data.summaryQuality}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                disabled={isSaving}
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={!canSave || isSaving}
                className={`min-w-[140px] font-semibold ${
                  isOverLimit
                    ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save & Submit'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}