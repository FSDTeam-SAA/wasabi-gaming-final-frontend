'use client';

import React from "react";
import { PsychometricQuestion } from "./data";
import { cn } from "@/utils/cn";

export const RadioButton = ({
    label,
    checked,
    onChange,
    value
}: {
    label: string;
    checked: boolean;
    onChange: (value: number) => void;
    value: number
}) => (
    <label
        className={cn(
            "flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200",
            checked
                ? "border-yellow-400 bg-yellow-50 shadow-sm"
                : "border-gray-100 hover:border-yellow-200 hover:bg-gray-50/50"
        )}
    >
        <div className="relative w-5 h-5 shrink-0">
            <input
                type="radio"
                checked={checked}
                onChange={() => onChange(value)}
                className="sr-only"
            />
            <div
                className={cn(
                    "absolute inset-0 rounded-full border-2 transition-colors",
                    checked ? "border-yellow-400" : "border-gray-300"
                )}
            />
            {checked && (
                <div className="absolute inset-1.5 bg-yellow-400 rounded-full" />
            )}
        </div>

        <span className={cn(
            "text-base font-bold flex-1 transition-colors",
            checked ? "text-black" : "text-gray-600"
        )}>{label}</span>
    </label>
);

interface QuestionProps {
    question: PsychometricQuestion;
    selectedAnswer: number | null;
    onAnswerSelect: (index: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
        <div className="font-poppins">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {question.text}
            </h3>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <RadioButton
                        key={index}
                        label={option}
                        checked={selectedAnswer === index}
                        onChange={onAnswerSelect}
                        value={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;
