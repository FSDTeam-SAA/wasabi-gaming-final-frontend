'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { PresentationPromptSection } from '../../../_components/presentation-prompt-section';
import { ResponseEditor } from '../../../_components/response-editor';
import { RequirementsSection } from '../../../_components/requirements-section';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { PresentationTaskApiResponse } from '../../../_components/written-presentation-data-type';

// import Footer from '../_components/footer';

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
      {/* <Navbar /> */}

      {/* Timer Banner */}
      <div className={`px-6 py-3 flex items-center justify-between ${isTimeWarning ? 'bg-yellow-400' : 'bg-yellow-300'}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Exercise</span>
          <span className="text-sm font-semibold">IN-TRAY EMAIL EXERCISE</span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${isTimeWarning ? 'bg-gray-900 text-yellow-300' : 'bg-yellow-500 text-gray-900'}`}>
          <Clock className="w-5 h-5" />
          <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2">Assessment Module 01</p>
          <h1 className="text-4xl font-bold text-gray-900">Written Presentation Task</h1>
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
          <div className="space-y-6">
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
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleCancel}
            className="border-gray-900 text-gray-900 hover:bg-gray-100 bg-transparent"
          >
            Cancel Assessment
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
          >
            {isPending ? 'Submitting...' : 'Submit Response'}
          </Button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
