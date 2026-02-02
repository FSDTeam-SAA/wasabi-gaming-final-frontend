'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Clock, Save } from 'lucide-react';
// import Navbar from '../_components/navbar';
import { EmailInbox } from '../_components/email-inbox';
import { EmailDisplay } from '../_components/email-display';
// import Footer from '../_components/footer';

const mockEmails = [
  {
    id: '1',
    subject: 'Disclosure Review: Riverside Case',
    priority: 'HIGH' as const,
    isRead: false,
  },
  {
    id: '2',
    subject: 'Draft Witness statement: Follow Up',
    priority: 'MEDIUM' as const,
    isRead: false,
  },
  {
    id: '3',
    subject: 'Billing Query: Newton Homes Matter',
    priority: 'LOW' as const,
    isRead: false,
  },
];

const emailDetails: Record<string, any> = {
  '1': {
    senderName: 'James Turner',
    senderTitle: 'Assistant Associate Professor',
    time: '09:45',
    subject: 'Disclosure Review: Riverside Case',
    content:
      'Hi,\n\nWe have cresceiveesie the disclosure documents for the Riverside Developments vs Newton Homes matter by 3 p.m. for a client call. The client specifically asked that we flag any key surresponse between the parties disputes',
    instruction:
      'Prioritize the mail thread "Construction Delays - 2023" - plaing a note of no more than 150 words outlining key points and potential risks; send you summary back me for review before 2:30 p.m.',
  },
  '2': {
    senderName: 'Sarah Mitchell',
    senderTitle: 'Senior Associate',
    time: '08:30',
    subject: 'Draft Witness statement: Follow Up',
    content: 'Following up on the witness statement draft. Please review and provide feedback on the key sections.',
    instruction: 'Expected completion by end of today. Please confirm receipt.',
  },
  '3': {
    senderName: 'Finance Team',
    senderTitle: 'Billing Department',
    time: '07:15',
    subject: 'Billing Query: Newton Homes Matter',
    content: 'Query regarding the billing for the Newton Homes matter. Please clarify the hours logged.',
    instruction: 'Respond with clarification within 24 hours.',
  },
};

export default function EmailExercisePage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(1442); // 24:02
  const [selectedEmailId, setSelectedEmailId] = useState('1');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

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

  const currentEmail = emailDetails[selectedEmailId];

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSavingDraft(false);
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/ai-assessment-centre/results/email-exercise');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <Navbar /> */}

      {/* Yellow Banner with Exercise Info */}
      <div className="bg-yellow-400 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">Exercise</span>
          <span className="text-lg font-bold text-gray-900">IN-TRAY EMAIL EXERCISE</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-yellow-400 font-bold">
          <Clock className="w-5 h-5" />
          <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Inbox */}
          <div>
            <EmailInbox
              emails={mockEmails}
              selectedEmailId={selectedEmailId}
              onSelectEmail={setSelectedEmailId}
            />
          </div>

          {/* Right Column - Email Display (spans 2 columns on desktop) */}
          <div className="lg:col-span-2">
            {currentEmail && (
              <EmailDisplay
                senderName={currentEmail.senderName}
                senderTitle={currentEmail.senderTitle}
                time={currentEmail.time}
                subject={currentEmail.subject}
                content={currentEmail.content}
                instruction={currentEmail.instruction}
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
            className="border-gray-900 text-gray-900 hover:bg-gray-100 bg-transparent"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            size="lg"
            onClick={handleSubmitAll}
            disabled={isSubmitting}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit All'}
          </Button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
