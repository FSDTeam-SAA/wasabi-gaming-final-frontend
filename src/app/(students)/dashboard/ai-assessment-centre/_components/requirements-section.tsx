'use client';

import { useState } from 'react';

interface Requirement {
  id: string;
  label: string;
  completed: boolean;
}

interface RequirementsSectionProps {
  title?: string;
  requirements: Requirement[];
  onRequirementChange?: (id: string, completed: boolean) => void;
}

export function RequirementsSection({
  title = 'Requirements',
  requirements: initialRequirements,
  onRequirementChange,
}: RequirementsSectionProps) {
  const [requirements, setRequirements] = useState(initialRequirements);

  const handleToggle = (id: string) => {
    setRequirements(prev =>
      prev.map(req =>
        req.id === id ? { ...req, completed: !req.completed } : req
      )
    );
    const req = requirements.find(r => r.id === id);
    onRequirementChange?.(id, req ? !req.completed : true);
  };

  const completedCount = requirements.filter(r => r.completed).length;

  return (
    <div className="bg-yellow-50 p-4 rounded-lg space-y-4 border border-yellow-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <span className="text-xs text-gray-600">{completedCount}/{requirements.length} completed</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {requirements.map(req => (
          <label
            key={req.id}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              checked={req.completed}
              onChange={() => handleToggle(req.id)}
              className="w-4 h-4 accent-yellow-400"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              {req.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
