import React, { useState } from "react";
import { Plus, Trash2, Award, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LeadershipEntry {
    id: number;
    title?: string;
    organization?: string;
    date?: string;
    description?: string;
}

interface LeadershipExperienceProps {
    data?: LeadershipEntry[];
    updateFormData: (section: string, data: LeadershipEntry[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

const LeadershipExperience: React.FC<LeadershipExperienceProps> = ({
    data = [],
    updateFormData,
    onNext,
    onPrev,
}) => {
    const [entries, setEntries] = useState<LeadershipEntry[]>(
        data.length ? data : [{ id: Date.now() }]
    );

    // Sync to parent formData
    const syncToParent = (newEntries: LeadershipEntry[]) => {
        updateFormData("Leadership", newEntries);
        setEntries(newEntries);
    };

    const addEntry = () => {
        syncToParent([...entries, { id: Date.now() }]);
    };

    const removeEntry = (id: number) => {
        syncToParent(entries.filter((e) => e.id !== id));
    };

    const updateEntry = (id: number, field: keyof Omit<LeadershipEntry, 'id'>, value: string) => {
        const newEntries = entries.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
        );
        syncToParent(newEntries);
    };

    const handleNext = () => {
        const hasValid = entries.some((e) => e.title && e.organization && e.date);
        if (hasValid) onNext();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
                    <Award className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold main-color">
                        Leadership Experience
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Add your leadership experience
                    </p>
                </div>
            </div>

            {/* Entries */}
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="relative p-6 space-y-5 bg-white border border-gray-200 rounded-xl"
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

                    {/* Field Type / Title */}
                    <div>
                        <Label htmlFor={`title-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Title / Name of Achievement
                        </Label>
                        <Input
                            id={`title-${entry.id}`}
                            type="text"
                            value={entry.title || ""}
                            onChange={(e) => updateEntry(entry.id, "title", e.target.value)}
                            placeholder="Team Leader, Student President, etc."
                            className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                    </div>

                    {/* Organization & Date */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor={`organization-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                Organization / Issuing Body
                            </Label>
                            <Input
                                id={`organization-${entry.id}`}
                                type="text"
                                value={entry.organization || ""}
                                onChange={(e) =>
                                    updateEntry(entry.id, "organization", e.target.value)
                                }
                                placeholder="Organization name"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <Label htmlFor={`date-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                Date / Year
                            </Label>
                            <Input
                                id={`date-${entry.id}`}
                                type="text"
                                value={entry.date || ""}
                                onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                                placeholder="2023"
                                className="focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <Label htmlFor={`description-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Description / Details
                        </Label>
                        <Textarea
                            id={`description-${entry.id}`}
                            rows={3}
                            value={entry.description || ""}
                            onChange={(e) =>
                                updateEntry(entry.id, "description", e.target.value)
                            }
                            placeholder="Led development of cloud-based applications. Mentored junior developers and improved team productivity by 30%."
                            className="resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                        <Sparkles className="absolute text-[#4d7be7] top-[5.5rem] right-2 w-4 h-4" />
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
                Add Another Position
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
                    disabled={!entries.some((e) => e.title && e.organization && e.date)}
                    className="px-6 py-2 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default LeadershipExperience;
