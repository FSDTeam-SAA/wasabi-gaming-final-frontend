'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CaseParticipantSidebar } from '../_components/case-participant-sidebar';
import { CaseSection } from '../_components/case-section';
import Footer from '../_components/footer';

const participants = [
  { id: '1', name: 'William Stevenson' },
  { id: '2', name: 'Ethan Dickman' },
  { id: '3', name: 'Olivia Jackson' },
];

export default function CaseStudyPage() {
  const router = useRouter();
  const [selectedParticipant, setSelectedParticipant] = useState('1');
  const [summary, setSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleSummaryChange = (text: string) => {
    setSummary(text);
    const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(count);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <Navbar /> */}

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div>
            <CaseParticipantSidebar
              participants={participants}
              selectedId={selectedParticipant}
              onSelectParticipant={setSelectedParticipant}
              moduleProgress={65}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <span>Module 3</span>
                <span className="mx-2">•</span>
                <span>Negligence</span>
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Duty of Care Analysis</h1>
              <p className="text-gray-700">
                Review the precedent case below and apply the established legal principles to the fictional scenario.
              </p>
            </div>

            {/* Case Sections */}
            <div className="space-y-6">
              {/* Precedent Summary */}
              <CaseSection
                number="01"
                title="Precedent summary"
                subtitle="Legal Precedent"
                borderColor="black"
                content={[
                  {
                    label: 'Facts :',
                    value: 'Mrs Donoghue consumed ginger beer that contained a decomposed snail, which caused her to fall ill.',
                  },
                  {
                    label: 'Issue :',
                    value: 'Whether a manufacturer owes a duty of care to the ultimate consumer where there is no direct contract.',
                  },
                  {
                    label: 'Holding :',
                    value: 'The House of Lords recognised a duty of care owed to one\'s neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
                  },
                  {
                    label: 'Principle :',
                    value: 'A manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
                  },
                ]}
              />

              {/* Pretend Case */}
              <CaseSection
                number="01"
                title="Pretend case (fictional)"
                subtitle="Case Scenario"
                borderColor="yellow"
                content={[
                  {
                    label: 'Facts :',
                    value: 'Mason bought a takeaway coffee, the lid was not secured, hot liquid spilled and caused burns. The drink was sold through a third-party distributor.',
                  },
                  {
                    label: 'Issue :',
                    value: 'Whether Fresh Brew owes a duty of care to Mason in these circumstances.',
                  },
                  {
                    label: 'Key details :',
                    value: 'The House of Lords recognised a duty of care owed to one\'s neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.',
                  },
                ]}
              />

              {/* Your Summary */}
              <div className="border-t-8 border-yellow-400 bg-white p-6 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center font-bold text-white">
                      01
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Your Summary</h3>
                  </div>
                  <div className="text-xs font-bold text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
                    {wordCount} / 200 words
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  📋 Analysis & Application
                </p>

                {/* Instructions */}
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-lg">ℹ️</span>
                    Instructions
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Apply the Donoghue principle to Mason v Fresh Brew</li>
                    <li>• State one argument for Mason, and one for Fresh Brew</li>
                  </ul>
                </div>

                {/* Summary Textarea */}
                <Textarea
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="Write your summary applying the principle here..."
                  className="min-h-48 resize-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
