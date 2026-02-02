'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { PresentationPromptSection } from '../_components/presentation-prompt-section';
import { ResponseEditor } from '../_components/response-editor';
import { RequirementsSection } from '../_components/requirements-section';
// import Footer from '../_components/footer';

export default function PresentationTaskPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3599); // 59:59
  const [requirements, setRequirements] = useState([
    { id: 'words', label: 'Use at least 300 words', completed: false },
    { id: 'tone', label: 'Use a professional tone', completed: false },
    { id: 'structure', label: 'Structure clearly', completed: false },
  ]);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/ai-assessment-centre/results/presentation');
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
              description="Our client, Ventara, is experiencing delays in the launch of their new electric vehicle. The main issues include supply chain disruptions and technical challenges with the battery system. This could affect their position in the market and profitability. You need to draft an internal email to the senior partner outlining the key legal risks and proposing a strategy to mitigate them while maintaining the client relationship."
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
              onResponseChange={setResponse}
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
            disabled={isSubmitting}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Response'}
          </Button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
