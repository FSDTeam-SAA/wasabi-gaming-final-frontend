'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Copy, Check } from "lucide-react";
import { cn } from "@/utils/cn";

interface InvitationContentProps {
    activeTab?: string;
}

export function InvitationContent({ activeTab = "single" }: InvitationContentProps) {
    const [copied, setCopied] = useState(false);
    const [singleForm, setSingleForm] = useState({
        studentName: "",
        email: "",
        message: "",
    });
    const [bulkForm, setBulkForm] = useState({
        csvFile: null as File | null,
        emails: "",
    });

    const handleCopyLink = () => {
        const link = "https://aspiringlegalnetwork.com/join/school-xyz-2024";
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const recentInvitations = [
        { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", time: "2 hours ago", status: "Accepted" },
        { id: 2, name: "Michael Chen", email: "michael.c@email.com", time: "5 hours ago", status: "Pending" },
        { id: 3, name: "Emma Williams", email: "emma.w@email.com", time: "1 day ago", status: "Accepted" },
        { id: 4, name: "James Brown", email: "james.b@email.com", time: "2 days ago", status: "Pending" },
    ];

    return (
        <div className="w-full space-y-8 font-poppins">
            {/* Invitation Form Section */}
            <div>
                {activeTab === "single" ? (
                    <Card className="p-8 bg-white border border-gray-200">
                        <h3 className="text-xl font-bold mb-6">Single Invitation</h3>
                        <div className="space-y-4 text-left">
                            <div>
                                <label className="block text-sm font-bold mb-2">Student Name *</label>
                                <Input
                                    placeholder="Enter student name"
                                    value={singleForm.studentName}
                                    onChange={(e) => setSingleForm({ ...singleForm, studentName: e.target.value })}
                                    className="w-full h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Email Address *</label>
                                <Input
                                    type="email"
                                    placeholder="student@email.com"
                                    value={singleForm.email}
                                    onChange={(e) => setSingleForm({ ...singleForm, email: e.target.value })}
                                    className="w-full h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Personal Message (Optional)</label>
                                <Textarea
                                    placeholder="Add a welcome message..."
                                    value={singleForm.message}
                                    onChange={(e) => setSingleForm({ ...singleForm, message: e.target.value })}
                                    className="w-full min-h-24 resize-none p-4"
                                    rows={4}
                                />
                            </div>
                            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 h-auto border-none mt-4">
                                Send Invitation
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-8 bg-white border border-gray-200">
                        <h3 className="text-xl font-bold mb-6">Bulk Invitation</h3>
                        <div className="space-y-6">
                            {/* CSV Upload */}
                            <div className="text-left">
                                <label className="block text-sm font-bold mb-3">Upload CSV File</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-yellow-400 transition-colors cursor-pointer bg-gray-50/50">
                                    <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                                    <p className="text-base font-bold mb-1">Drop your CSV file here or click to browse</p>
                                    <p className="text-sm text-gray-500">File should include: Name, Email</p>
                                    <input type="file" accept=".csv" className="hidden" />
                                </div>
                                <Button variant="outline" className="w-full mt-4 h-12 border-gray-300 font-bold">
                                    Download Template
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-medium">Or paste emails (one per line)</span>
                                </div>
                            </div>

                            {/* Email Paste */}
                            <div className="text-left">
                                <Textarea
                                    placeholder="student1@email.com&#10;student2@email.com&#10;student3@email.com"
                                    value={bulkForm.emails}
                                    onChange={(e) => setBulkForm({ ...bulkForm, emails: e.target.value })}
                                    className="w-full min-h-32 resize-none p-4"
                                    rows={6}
                                />
                            </div>

                            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 h-auto border-none">
                                Send Bulk Invitations
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            {/* Share Invitation Link Section */}
            <Card className="p-8 bg-white border border-gray-200 text-left">
                <h3 className="text-xl font-bold mb-2">Share Invitation Link</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium">
                    Generate a unique link that students can use to join your program
                </p>

                <div className="space-y-6">
                    <div className="flex gap-2">
                        <Input
                            value="https://aspiringlegalnetwork.com/join/school-xyz-2024"
                            readOnly
                            className="flex-1 bg-gray-50 h-12 font-medium"
                        />
                        <Button
                            onClick={handleCopyLink}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 w-12 p-0 border-none shrink-0"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">24</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students Joined</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">48</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Link Clicks</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">50%</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Conversion Rate</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Recent Invitations Section */}
            <Card className="p-8 bg-white border border-gray-200 text-left">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Recent Invitations</h3>
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">671 Total</span>
                </div>

                <div className="space-y-4">
                    {recentInvitations.map((invitation) => (
                        <div
                            key={invitation.id}
                            className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-base text-black">
                                    {invitation.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{invitation.name}</p>
                                    <p className="text-sm text-gray-500">{invitation.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <p className="text-xs text-gray-400 font-medium">{invitation.time}</p>
                                <span
                                    className={cn(
                                        "text-xs font-bold px-3 py-1 rounded-full",
                                        invitation.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                    )}
                                >
                                    {invitation.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* CTA Section */}
            <div className="bg-yellow-400 rounded-2xl p-10 text-center shadow-lg border-2 border-yellow-500">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-yellow-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-3">Start Building Your Student Network</h3>
                <p className="text-black/80 text-base font-medium max-w-lg mx-auto">Invite students now and help them succeed in their career journey through personalized guidance and opportunities.</p>
                <Button className="mt-8 bg-black hover:bg-black/90 text-white font-bold h-12 px-10 rounded-full border-none">
                    Send Invitations Now
                </Button>
            </div>
        </div>
    );
}
