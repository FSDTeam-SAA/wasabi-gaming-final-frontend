import React, { useState } from "react";
import { Plus, Trash2, Briefcase, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface LegalWorkEntry {
    id: number;
    jobTitle?: string;
    organisation?: string;
    responsibilities?: string;
    startYear?: string;
    endYear?: string;
    currentlyWorking?: boolean;
}

interface LegalWorkExperienceProps {
    data?: LegalWorkEntry[];
    updateFormData: (section: string, data: LegalWorkEntry[]) => void;
    onNext: () => void;
    onPrev: () => void;
    onPreview?: () => void;
}

const LegalWorkExperience: React.FC<LegalWorkExperienceProps> = ({
    data = [],
    updateFormData,
    onNext,
    onPrev,
    onPreview,
}) => {
    const [entries, setEntries] = useState<LegalWorkEntry[]>(
        data.length ? data : [{ id: Date.now() }]
    );

    const syncToParent = (newEntries: LegalWorkEntry[]) => {
        updateFormData("Legal", newEntries);
        setEntries(newEntries);
    };

    const addEntry = () => syncToParent([...entries, { id: Date.now() }]);
    const removeEntry = (id: number) => syncToParent(entries.filter((e) => e.id !== id));

    const updateEntry = (id: number, field: keyof Omit<LegalWorkEntry, 'id'>, value: string | boolean) => {
        const newEntries = entries.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
        );
        syncToParent(newEntries);
    };

    const handleNext = () => {
        const hasValid = entries.some(
            (e) => e.jobTitle && e.organisation && e.startYear
        );
        if (hasValid) onNext();
    };

    return (
        <div className="space-y-8 poppins">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
                    <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold main-color">
                        Legal Work Experience
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Add your Legal work experience
                    </p>
                </div>
            </div>

            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="relative p-6 space-y-5 border border-gray-200 rounded-xl"
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

                    {/* Job Title */}
                    <div>
                        <Label htmlFor={`jobTitle-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Job Title / Role
                        </Label>
                        <Input
                            id={`jobTitle-${entry.id}`}
                            type="text"
                            value={entry.jobTitle || ""}
                            onChange={(e) =>
                                updateEntry(entry.id, "jobTitle", e.target.value)
                            }
                            placeholder="Legal Associate"
                            className="focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Organisation */}
                    <div>
                        <Label htmlFor={`organisation-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Organisation / Firm Name
                        </Label>
                        <Input
                            id={`organisation-${entry.id}`}
                            type="text"
                            value={entry.organisation || ""}
                            onChange={(e) =>
                                updateEntry(entry.id, "organisation", e.target.value)
                            }
                            placeholder="Law Firm Name"
                            className="focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <Label htmlFor={`responsibilities-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                            Key Responsibilities
                        </Label>
                        <Textarea
                            id={`responsibilities-${entry.id}`}
                            rows={3}
                            value={entry.responsibilities || ""}
                            onChange={(e) =>
                                updateEntry(entry.id, "responsibilities", e.target.value)
                            }
                            placeholder="Briefly describe your responsibilities..."
                            className="focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Dates */}
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
                                className="focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor={`endYear-${entry.id}`} className="block mb-1 text-sm font-medium text-gray-700">
                                End Year
                            </Label>
                            <div className="flex items-center space-x-3">
                                <Input
                                    id={`endYear-${entry.id}`}
                                    type="text"
                                    value={entry.endYear || ""}
                                    onChange={(e) =>
                                        updateEntry(entry.id, "endYear", e.target.value)
                                    }
                                    placeholder="Currently working"
                                    className="flex-1 focus:ring-2 focus:ring-yellow-400"
                                    disabled={entry.currentlyWorking}
                                />
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`currently-${entry.id}`}
                                        checked={entry.currentlyWorking || false}
                                        onCheckedChange={(checked) =>
                                            updateEntry(entry.id, "currentlyWorking", !!checked)
                                        }
                                    />
                                    <Label htmlFor={`currently-${entry.id}`} className="text-sm text-gray-600 cursor-pointer">
                                        Currently working
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Another */}
            <Button
                type="button"
                onClick={addEntry}
                variant="outline"
                className="flex items-center gap-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            >
                <Plus size={14} />
                Add Another Legal Experience
            </Button>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
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
                        !entries.some((e) => e.jobTitle && e.organisation && e.startYear)
                    }
                    className="px-6 py-2 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                >
                    Next
                </Button>
            </div>

            {/* Show Preview Button */}
            {onPreview && (
                <div className="mt-6">
                    <Button
                        onClick={onPreview}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFF00] text-black font-medium rounded-xl hover:bg-[#ffff0e]"
                    >
                        <Eye />
                        Preview Resume
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LegalWorkExperience;
