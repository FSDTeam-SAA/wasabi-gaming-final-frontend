'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { Clock, X, Send } from 'lucide-react';
import { PresentationPromptSection } from '../../../_components/presentation-prompt-section';
import { ResponseEditor } from '../../../_components/response-editor';
import { RequirementsSection } from '../../../_components/requirements-section';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { PresentationTaskApiResponse } from '../../../_components/written-presentation-data-type';


export default function PresentationTaskPage({id}:{id:string}) {
  console.log(id)
  const assessmentId = id;
  const router = useRouter();
    const session = useSession();
  const token = session?.data?.accessToken
  const [timeLeft, setTimeLeft] = useState(3599); // 59:59
  const [requirements, setRequirements] = useState([
    { id: 'words', label: 'Use at least 300 words', completed: false },
    { id: 'tone', label: 'Use a professional tone', completed: false },
    { id: 'structure', label: 'Structure clearly', completed: false },
  ]);
  const [yourResponse, setYourResponse] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeWarning = timeLeft < 300; // 5 minutes



   // written case study get api
    const { data, isLoading, isError } =
    useQuery<PresentationTaskApiResponse>({
      queryKey: ["written-presentation", assessmentId],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${assessmentId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invitations");
        }

        return res.json();
      },
    });

    console.log(data)

    const writtentData = data?.data



    // written case study put api 
  const { mutate, isPending } = useMutation({
    mutationKey: ["written-presentation-put", assessmentId],
    mutationFn: async (values: { yourResponse: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${assessmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values)
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return 0;
      }
      toast.success(data?.message || "Written presentation updated successfully")
       setTimeout(() => {
      router.push(`/dashboard/ai-assessment-centre/presentation/results/${assessmentId}`)
    }, 1500)
    }
  })



  const handleSubmit = () => {
    mutate({yourResponse})
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this assessment?')) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
         <div className="flex items-start justify-between mb-8">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#0A0A0A]">Assessment Module 01</p>
                    <h1 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0A0A0A]">Written Presentation Task</h1>
                  </div>
                  <div className={` rounded-[12px] border-2 border-[#131313] px-4 py-2 flex items-center gap-3 ${isTimeWarning ? ' border-red-500 bg-red-50' : 'border-primary bg-[#FFFF00]'}`}>
                    <div className="bg-[#0A0A0A] p-[6px] rounded-[8px] flex-shrink-0 inline-flex items-center justify-center">
                      <Clock className={`w-5 h-5 ${isTimeWarning ? 'text-red-600' : 'text-[#FBBF24]'}`} />
                    </div>
                    <span className={`font-bold text-base ${isTimeWarning ? 'text-red-600' : 'text-[#0A0A0A]'}`}>
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Prompt */}
          <div className="space-y-6">
            <PresentationPromptSection
              title="Ventara Automotive"
              description={writtentData?.ventaraMobility || "N/A"}
              objectives={[
                'Identify contractual liabilities',
                'Propose negotiation strategy',
                'Draft clear next steps',
              ]}
              proTip="Focus on commercial awareness. The partner wants practical solutions, not just a list of problems."
            />
          </div>

          {/* Right Column - Response */}
          <div className="space-y-6 ">
            <div className="rounded-t-[12px] bg-[#FFF9E6]">
              <ResponseEditor
              maxWords={300}
              label="Your Response"
              subtitle="Internal Email Draft"
              placeholder="Start typing your response here..."
              onResponseChange={setYourResponse}
            />

            {/* Requirements */}
            <RequirementsSection
              requirements={requirements}
              onRequirementChange={(id, completed) => {
                setRequirements(prev =>
                  prev.map(req => req.id === id ? { ...req, completed } : req)
                );
              }}
            />
            </div>

             {/* Action Buttons */}
              <div className="bg-white flex flex-col md:flex-row gap-4 justify-end pb-6 pt-6 pr-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border-[2px] border-[#0A0A0A] text-[#0A0A0A] rounded-[12px] text-sm font-bold"
                >
                 <X /> Cancel Assessment
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FFFF00] rounded-[12px] text-[#0A0A0A] text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isPending ? 'Submitting...' : 'Submit Response'} <Send />
                </button>
              </div>
          </div>

           
        </div>

      
      </main>
    </div>
  );
}
