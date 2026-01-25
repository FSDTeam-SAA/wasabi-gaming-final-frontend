import React from "react";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SummaryStepProps {
    data: string;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    onNext: () => void;
    onBack: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
    data,
    setFormData,
    onNext,
    onBack,
}) => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
                    <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold main-color">
                        Professional Summary
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Brief overview of your career
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                    id="summary"
                    placeholder="Write a brief professional summary..."
                    value={data}
                    onChange={(e) =>
                        setFormData((prev: any) => ({
                            ...prev,
                            summary: e.target.value,
                        }))
                    }
                    className="w-full h-40 mt-2 bg-gray-50"
                />
            </div>

            <div className="flex justify-between mt-6">
                <Button
                    onClick={onBack}
                    variant="secondary"
                    className="px-8 py-3"
                >
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    className="px-8 py-3 bg-[#FFFF00] hover:bg-[#ffff0e] text-black"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SummaryStep;
