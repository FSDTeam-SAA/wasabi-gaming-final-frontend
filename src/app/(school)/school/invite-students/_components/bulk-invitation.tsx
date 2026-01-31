'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const BulkInvitation = () => {
    const [bulkForm, setBulkForm] = useState({
        csvFile: null as File | null,
        emails: "",
    });
    return (
        <div>

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
        </div>
    )
}

export default BulkInvitation