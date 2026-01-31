import React, { useState } from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EducationEntry {
    id: number;
    level?: string;
    institution?: string;
    grade?: string;
    subjects?: string;
    startYear?: string;
    endYear?: string;
}

interface EducationStepProps {
    data?: EducationEntry[];
    updateFormData: (section: string, data: EducationEntry[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

const EducationStep: React.FC<EducationStepProps> = ({
    data = [],
    updateFormData,
    onNext,
    onPrev,
}) => {
    const [entries, setEntries] = useState<EducationEntry[]>(
        data.length ? data : [{ id: Date.now() }]
    );

    // Sync to parent formData
    const syncToParent = (newEntries: EducationEntry[]) => {
        updateFormData("Education", newEntries);
        setEntries(newEntries);
    };

    const addEntry = () => {
        syncToParent([...entries, { id: Date.now() }]);
    };

    const removeEntry = (id: number) => {
        syncToParent(entries.filter((e) => e.id !== id));
    };

    const updateEntry = (id: number, field: keyof Omit<EducationEntry, 'id'>, value: string) => {
        const newEntries = entries.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
        );
        syncToParent(newEntries);
    };

    const handleNext = () => {
        const hasValid = entries.some(
            (e) => e.level && e.institution && e.startYear
        );
        if (hasValid) onNext();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold main-color">
                        Education Level
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Add your educational background
                    </p>
                </div>
            </div>

            {/* Entries */}
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="relative p-6 space-y-5 border border-gray-200 rounded-xl bg-gray-50"
                >
                    {entries.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            className="absolute text-red-500 top-2 right-2 hover:text-red-700"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    {/* Education Level */}
                    <div>
                        <Label htmlFor={`level-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Education Level
                        </Label>
                        <Input
                            id={`level-${entry.id}`}
                            type="text"
                            value={entry.level || ""}
                            onChange={(e) => updateEntry(entry.id, "level", e.target.value)}
                            placeholder="LLB in Law"
                            className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                    </div>

                    {/* Institution */}
                    <div>
                        <Label htmlFor={`institution-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Institution
                        </Label>
                        <Input
                            id={`institution-${entry.id}`}
                            type="text"
                            value={entry.institution || ""}
                            onChange={(e) =>
                                updateEntry(entry.id, "institution", e.target.value)
                            }
                            placeholder="University of Technology"
                            className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                    </div>

                    {/* Grade & Subjects */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor={`grade-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                Grade
                            </Label>
                            <Input
                                id={`grade-${entry.id}`}
                                type="text"
                                value={entry.grade || ""}
                                onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
                                placeholder="First Class Honours"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <Label htmlFor={`subjects-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                Subjects
                            </Label>
                            <Input
                                id={`subjects-${entry.id}`}
                                type="text"
                                value={entry.subjects || ""}
                                onChange={(e) =>
                                    updateEntry(entry.id, "subjects", e.target.value)
                                }
                                placeholder="Contract Law, Criminal Law"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Start & End Year */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor={`startYear-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                Start Year
                            </Label>
                            <Input
                                id={`startYear-${entry.id}`}
                                type="text"
                                value={entry.startYear || ""}
                                onChange={(e) =>
                                    updateEntry(entry.id, "startYear", e.target.value)
                                }
                                placeholder="2015"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <Label htmlFor={`endYear-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                End Year
                            </Label>
                            <Input
                                id={`endYear-${entry.id}`}
                                type="text"
                                value={entry.endYear || ""}
                                onChange={(e) =>
                                    updateEntry(entry.id, "endYear", e.target.value)
                                }
                                placeholder="2018"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Another */}
            <Button
                type="button"
                onClick={addEntry}
                variant="outline"
                className="flex items-center gap-2 border-dashed"
            >
                <Plus size={14} />
                Add Another Form of Education
            </Button>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
                <Button
                    type="button"
                    onClick={onPrev}
                    variant="secondary"
                    className="px-6 py-2"
                >
                    Previous
                </Button>

                <Button
                    type="button"
                    onClick={handleNext}
                    disabled={
                        !entries.some((e) => e.level && e.institution && e.startYear)
                    }
                    className="px-6 py-2 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default EducationStep;
