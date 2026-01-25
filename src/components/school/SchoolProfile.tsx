'use client';

import React, { useState } from "react";
import {
    Calendar,
    Check,
    X,
    Trash2,
    Edit2,
    MapPin,
    Globe,
    Info,
    Lock,
    Mail,
    Phone,
    Upload,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const SchoolProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Realistic UK Law School dummy data
    const schoolData = {
        name: "Westminster Law School",
        fullName: "Westminster Law School, University of Westminster",
        type: "Public University Law School",
        established: "1838 (University), Law School established 1968",
        location: "London, United Kingdom",
        address: "4–12 Little Titchfield Street, London W1W 7BY",
        email: "admissions@westminster.ac.uk",
        phone: "+44 (0)20 7911 5000",
        website: "www.westminster.ac.uk/law",
        about:
            "Westminster Law School is one of the UK’s leading providers of legal education, located in the heart of legal London. We offer qualifying law degrees (LLB), the Solicitors Qualifying Examination (SQE) preparation courses, LLM programmes, and professional development for solicitors and barristers. Our strong links with the legal profession, chambers, and law firms ensure excellent employability outcomes.",
        studentIntake: "Approximately 1,200 undergraduate and postgraduate law students",
        ranking: "Top 50 UK Law Schools (Guardian University Guide 2025)",
        profileCompletion: 92,
    };

    const [formData, setFormData] = useState(schoolData);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(schoolData);
        setIsEditing(false);
    };

    const renderSchoolInfo = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Edit Mode Notice */}
            {isEditing && (
                <Card className="bg-yellow-50 border-yellow-200 rounded-3xl overflow-hidden shadow-sm">
                    <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
                                <Info className="w-5 h-5 text-black" />
                            </div>
                            <p className="text-gray-900 font-bold">You are currently editing your school profile.</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button variant="outline" onClick={handleCancel} className="flex-1 bg-white border-gray-200 font-bold h-11 px-6">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="flex-1 bg-black hover:bg-black/90 text-white font-bold h-11 px-6 border-none shadow-md">
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* School Overview */}
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">School Overview</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">School Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Legal Name</label>
                            <Input
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Institution Type</label>
                            <Input
                                value={formData.type}
                                onChange={(e) => handleInputChange("type", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Year Established</label>
                            <Input
                                value={formData.established}
                                onChange={(e) => handleInputChange("established", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Campus Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white pl-12"
                            />
                        </div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">About the Law School</label>
                        <Textarea
                            value={formData.about}
                            onChange={(e) => handleInputChange("about", e.target.value)}
                            disabled={!isEditing}
                            rows={6}
                            className="rounded-xl text-base font-medium leading-relaxed bg-gray-50/50 border-gray-100 focus:bg-white p-4"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Student Intake</label>
                            <Input
                                value={formData.studentIntake}
                                onChange={(e) => handleInputChange("studentIntake", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Ranking</label>
                            <Input
                                value={formData.ranking}
                                onChange={(e) => handleInputChange("ranking", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact & Links */}
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">Contact & Digital Presence</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={formData.email}
                                disabled={!isEditing}
                                className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={formData.phone}
                                disabled={!isEditing}
                                className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                            />
                        </div>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={formData.website}
                                disabled={!isEditing}
                                className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderSecurity = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">Change Password</h3>
                    <div className="max-w-md space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">New Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <Button className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg rounded-2xl border-none shadow-lg mt-4">
                            Update Security Credentials
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none ring-1 ring-red-100 rounded-[32px] overflow-hidden shadow-sm bg-red-50/50">
                <CardContent className="p-10 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-red-600">Danger Zone</h3>
                        <p className="text-gray-500 font-medium">Permanently delete your school account and all associated student data. This action cannot be undone.</p>
                    </div>
                    <Button variant="destructive" className="h-14 px-10 rounded-2xl font-black text-lg shrink-0">
                        <Trash2 className="w-5 h-5 mr-3" /> Delete School Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/30 font-poppins pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-black italic tracking-tighter mb-2">
                            Profile Settings
                        </h1>
                        <p className="text-lg text-gray-400 font-bold max-w-xl">
                            Manage your institution's digital footprint and security protocols.
                        </p>
                    </div>
                </header>

                {/* School Header Card */}
                <Card className="border-none overflow-hidden rounded-[40px] shadow-2xl bg-white mb-12 ring-2 ring-yellow-400/20">
                    <div className="h-40 bg-black relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-400/10 blur-3xl opacity-50" />
                        <div className="absolute -bottom-16 left-12 w-32 h-32 bg-yellow-400 rounded-3xl flex items-center justify-center text-black text-4xl font-black shadow-2xl border-4 border-white rotate-3">
                            WLS
                        </div>
                    </div>
                    <CardContent className="pt-20 pb-12 px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">{formData.name}</h2>
                                    <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Verified Institution</div>
                                </div>
                                <p className="text-gray-500 font-bold text-lg">{formData.fullName}</p>
                                <p className="text-gray-600 font-medium leading-relaxed max-w-3xl">
                                    {formData.about}
                                </p>
                                <div className="flex flex-wrap gap-6 pt-4">
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                        <MapPin className="w-4 h-4" /> {formData.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                        <Calendar className="w-4 h-4" /> Est. {formData.established.split(",")[1]?.trim() || "1968"}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                        <Mail className="w-4 h-4" /> {formData.email}
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                className={cn(
                                    "h-14 px-8 rounded-2xl font-black text-lg transition-all shadow-lg border-none",
                                    isEditing ? "bg-gray-100 text-gray-500 hover:bg-gray-200" : "bg-yellow-400 text-black hover:bg-yellow-500"
                                )}
                            >
                                {isEditing ? <><X className="w-5 h-5 mr-3" /> Stop Editing</> : <><Edit2 className="w-5 h-5 mr-3" /> Edit School Profile</>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Control */}
                <Tabs defaultValue="school-info" className="w-full">
                    <TabsList className="bg-transparent h-16 p-1 gap-4 mb-12 flex justify-start overflow-x-auto">
                        <TabsTrigger
                            value="school-info"
                            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-2xl h-14 px-10 font-black text-lg transition-all text-gray-400"
                        >
                            <Info className="w-5 h-5 mr-3" /> School Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-2xl h-14 px-10 font-black text-lg transition-all text-gray-400"
                        >
                            <Lock className="w-5 h-5 mr-3" /> Security & Admin
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="school-info">
                        {renderSchoolInfo()}
                    </TabsContent>
                    <TabsContent value="security">
                        {renderSecurity()}
                    </TabsContent>
                </Tabs>

                {/* Completion Status */}
                <div className="mt-16 bg-black rounded-[40px] p-12 relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="w-24 h-24 bg-yellow-400 rounded-[32px] flex items-center justify-center text-black shadow-2xl shrink-0 rotate-3">
                            <Check className="w-12 h-12" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h3 className="text-3xl font-black text-white italic tracking-tight">Institutional Profile Strength</h3>
                            <p className="text-gray-400 text-lg font-medium max-w-2xl">
                                A complete institutional profile increases student visibility by <span className="text-yellow-400 font-bold">42%</span> across the network.
                            </p>
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Global Readiness Score</span>
                                    <span className="text-3xl font-black text-yellow-400">{formData.profileCompletion}%</span>
                                </div>
                                <Progress value={formData.profileCompletion} indicatorClassName="bg-yellow-400" className="h-4 bg-white/5 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfile;
