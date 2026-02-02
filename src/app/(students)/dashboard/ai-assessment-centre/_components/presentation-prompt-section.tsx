'use client';

import { AlertCircle } from 'lucide-react';

interface PromptSectionProps {
  title: string;
  description: string;
  objectives: string[];
  proTip: string;
}

export function PresentationPromptSection({
  title,
  description,
  objectives,
  proTip,
}: PromptSectionProps) {
  return (
    <div className="space-y-4">
      {/* AI Prompt Header */}
      <div className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg">
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12h6m-6 4h6m2-15H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <span className="font-semibold">AI Prompt</span>
      </div>

      {/* Case Title */}
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="w-16 h-1 bg-yellow-400 rounded" />
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{description}</p>

      {/* Key Objectives */}
      <div className="border-l-4 border-yellow-400 bg-white p-4 rounded">
        <h4 className="font-bold mb-3">Key Objectives</h4>
        <ul className="space-y-2">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 text-yellow-500 mt-1">▶</span>
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pro Tip */}
      <div className="bg-gray-100 p-4 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900">Pro Tip</h4>
          <p className="text-gray-700 text-sm mt-1">{proTip}</p>
        </div>
      </div>
    </div>
  );
}
