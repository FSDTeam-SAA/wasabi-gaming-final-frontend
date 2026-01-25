'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIAssessmentTest } from "./aiAssessmentData";
import { cn } from "@/utils/cn";

interface LegalCaseStudyProps {
    onCancel: () => void;
    onSubmit: (data: { testId: number; response: string; wordCount: number }) => void;
    test: AIAssessmentTest;
}

const LegalCaseStudy: React.FC<LegalCaseStudyProps> = ({ onCancel, onSubmit, test }) => {
    const [response, setResponse] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (test?.content) {
            setResponse("");
            setWordCount(0);
        }
    }, [test]);

    const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setResponse(text);

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(text.trim() === "" ? 0 : words.length);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                testId: test.id,
                response,
                wordCount,
            });
        }
    };

    const currentTest = test || {
        content: {
            users: ["William Stevenson", "Ethan Dickman", "Olivia Jackson"],
            precedent: {
                title: "Precedent summary",
                facts: "Mrs Donoghue consumed ginger beer that contained a decomposed snail, which caused her to fall ill.",
                issue: "Whether a manufacturer owes a duty of care to the ultimate consumer where there is no direct contract.",
                holding: "The House of Lords recognised a duty of care owed to one's neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.",
                principle: "A manufacturer owes a duty of care to consumers where harm is reasonably foreseeable."
            },
            pretendCase: {
                title: "Pretend case (fictional)",
                facts: "Mason bought a takeaway coffee, the lid was not secured, hot liquid spilled and caused burns. The drink was sold through a third-party distributor.",
                issue: "Whether Fresh Brew owes a duty of care to Mason in these circumstances.",
                keyDetails: "The House of Lords recognised a duty of care owed to one's neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable."
            },
            userSummary: {
                title: "Your summary",
                instructions: [
                    "Apply the Donoghue principal to Mason v Fresh Brew",
                    "State one arguments for Mason, and one for Fresh Brew"
                ],
                wordLimit: 200
            }
        }
    };

    const users = currentTest.content.users || [];
    const precedent = currentTest.content.precedent!;
    const pretendCase = currentTest.content.pretendCase!;
    const userSummary = currentTest.content.userSummary!;

    const sidebarContent = (
        <div className="flex flex-col py-4 gap-2">
            {users.map((user, index) => (
                <div
                    key={index}
                    className={cn(
                        "mx-4 p-4 rounded-lg font-poppins text-sm md:text-base transition-colors",
                        index === 0 ? "bg-[#ffff00] font-bold text-[#1e1e1e]" : "text-[#1e1e1e] hover:bg-gray-100"
                    )}
                >
                    {user}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-poppins text-[#1e1e1e] flex flex-col">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden border-b p-4 bg-white">
                <Button
                    variant="outline"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? "Hide Panel" : "Show Panel"}
                </Button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={cn(
                    "w-72 bg-[#f5f5f5] border-r transition-all overflow-y-auto",
                    isSidebarOpen ? "block" : "hidden",
                    "lg:block"
                )}>
                    {sidebarContent}
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-white p-4 md:p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Precedent Summary Card */}
                        <Card className="rounded-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-[#fff9c4] to-[#fffde7]">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold shrink-0">
                                        01
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold font-poppins mt-2">
                                        {precedent.title}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: "Facts", value: precedent.facts },
                                        { label: "Issue", value: precedent.issue },
                                        { label: "Holding", value: precedent.holding },
                                        { label: "Principle", value: precedent.principle }
                                    ].map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                                            <span className="font-bold text-sm md:text-base">{item.label}</span>
                                            <span className="sm:col-span-3 text-sm md:text-base leading-relaxed">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pretend Case Card */}
                        <Card className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold shrink-0">
                                        02
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold font-poppins mt-2">
                                        {pretendCase.title}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: "Facts", value: pretendCase.facts },
                                        { label: "Issue", value: pretendCase.issue },
                                        { label: "Key details", value: pretendCase.keyDetails }
                                    ].map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                                            <span className="font-bold text-sm md:text-base">{item.label}</span>
                                            <span className="sm:col-span-3 text-sm md:text-base leading-relaxed">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Summary Card */}
                        <Card className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold shrink-0">
                                            03
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold font-poppins mt-2 mb-4">
                                                {userSummary.title}
                                            </h3>
                                            <ul className="text-sm md:text-base space-y-2">
                                                {userSummary.instructions.map((ins, idx) => (
                                                    <li key={idx} className="flex gap-2">
                                                        <span>•</span> <span>{ins}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-[#f8f9fa] rounded-lg border p-4">
                                        <Textarea
                                            value={response}
                                            onChange={handleResponseChange}
                                            placeholder="Write your summary applying the principal here"
                                            className="border-none bg-transparent resize-none min-h-[160px] focus-visible:ring-0 text-sm md:text-base font-poppins"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                                        <div className="space-y-1">
                                            <div className="text-sm text-gray-500 font-poppins">Word count</div>
                                            <div className={cn(
                                                "text-lg font-bold font-poppins",
                                                wordCount > userSummary.wordLimit ? "text-red-500" : "text-[#1e1e1e]"
                                            )}>
                                                {wordCount} of {userSummary.wordLimit}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 w-full sm:w-auto">
                                            <Button
                                                variant="outline"
                                                onClick={onCancel}
                                                className="flex-1 sm:px-6 font-medium font-poppins"
                                            >
                                                Save Draft
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={wordCount > userSummary.wordLimit || wordCount === 0}
                                                className="flex-1 sm:px-6 bg-[#ffff00] hover:bg-[#e6e600] text-[#1e1e1e] font-bold border-none font-poppins"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalCaseStudy;
