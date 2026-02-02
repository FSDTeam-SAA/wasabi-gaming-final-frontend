'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ResponseEditorProps {
  maxWords?: number;
  label?: string;
  subtitle?: string;
  placeholder?: string;
  onResponseChange?: (text: string) => void;
  initialValue?: string;
}

export function ResponseEditor({
  maxWords = 300,
  label = 'Your Response',
  subtitle = 'Internal Email Draft',
  placeholder = 'Start typing your response here...',
  onResponseChange,
  initialValue = '',
}: ResponseEditorProps) {
  const [response, setResponse] = useState(initialValue);
  const wordCount = response.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleChange = (text: string) => {
    setResponse(text);
    onResponseChange?.(text);
  };

  const isBelowLimit = wordCount <= maxWords;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-yellow-100 px-4 py-3 rounded-lg">
        <div>
          <h3 className="font-bold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
          isBelowLimit ? 'bg-white text-gray-700' : 'bg-red-100 text-red-700'
        }`}>
          {wordCount} / {maxWords} words
        </div>
      </div>

      {/* Editor */}
      <Textarea
        value={response}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-64 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      />

      {/* Word count indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{wordCount} words used</span>
        {wordCount > maxWords && (
          <span className="text-red-600 font-semibold">
            Exceeds limit by {wordCount - maxWords} words
          </span>
        )}
      </div>
    </div>
  );
}
