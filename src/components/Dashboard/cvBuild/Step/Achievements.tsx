import React, { useState } from "react";
import { Plus, Trash2, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AchievementsStepProps {
    data?: string[];
    updateFormData: (section: string, data: string[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

const AchievementsStep: React.FC<AchievementsStepProps> = ({
    data = [],
    updateFormData,
    onNext,
    onPrev,
}) => {
    const [skills, setSkills] = useState<string[]>(data);
    const [inputValue, setInputValue] = useState("");

    // Sync to parent
    const syncToParent = (newSkills: string[]) => {
        updateFormData("Skills", newSkills);
        setSkills(newSkills);
    };

    const addSkill = () => {
        if (inputValue.trim() && !skills.includes(inputValue.trim())) {
            const newSkills = [...skills, inputValue.trim()];
            syncToParent(newSkills);
            setInputValue("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        const newSkills = skills.filter((s) => s !== skillToRemove);
        syncToParent(newSkills);
    };

    const addRecommended = (skill: string) => {
        if (!skills.includes(skill)) {
            syncToParent([...skills, skill]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const handleSave = () => {
        if (skills.length > 0) {
            onNext(); // Treat Save as Next
        }
    };

    // Recommended skills (you can customize)
    const recommended = [
        "Leadership",
        "Problem Solving",
        "Legal Research",
        "Contract Drafting",
        "Teamwork",
        "Communication",
    ];

    return (
        <div className="space-y-8 poppins">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
                    <Award className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold main-color">
                        Achievements
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Add your technical and soft skills
                    </p>
                </div>
            </div>

            {/* Skills Label */}
            <div>
                <Label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-700">
                    Skills
                </Label>

                {/* Added Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                        <Badge
                            key={skill}
                            variant="outline"
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium border border-[#dbdb08]"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-red-600"
                            >
                                <Trash2 size={12} />
                            </button>
                        </Badge>
                    ))}
                </div>

                {/* Add Skill Input */}
                <div className="flex gap-2">
                    <Input
                        id="skills"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a skill..."
                        className="flex-1 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <Button
                        type="button"
                        onClick={addSkill}
                        className="px-4 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                    >
                        <Plus size={16} />
                    </Button>
                </div>
            </div>

            {/* Recommended Skills */}
            <div className="p-4 mt-6 border border-blue-200 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm font-medium main-color inter">
                        Recommended skills
                    </p>
                </div>
                <p className="mb-3 text-xs text-blue-700">
                    Based on your psychometric results and target roles
                </p>
                <div className="flex flex-wrap gap-2">
                    {recommended
                        .filter((s) => !skills.includes(s))
                        .map((skill) => (
                            <button
                                key={skill}
                                type="button"
                                onClick={() => addRecommended(skill)}
                                className="px-3 py-1 text-xs font-medium text-blue-700 transition bg-white border border-blue-300 rounded-full hover:bg-blue-100"
                            >
                                + {skill}
                            </button>
                        ))}
                </div>
            </div>

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
                    onClick={handleSave}
                    disabled={skills.length === 0}
                    className="px-6 py-2 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default AchievementsStep;
