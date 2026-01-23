"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe, Linkedin, Github, CheckCircle2 } from "lucide-react";

export default function ProfileForm() {
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        company: "",
        location: "",
        grade: "",
        bio: "",
        socials: {
            website: "",
            linkedin: "",
            github: "",
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setProfileData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSocialChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            socials: {
                ...prev.socials,
                [id]: value,
            },
        }));
    };


    const calculateCompletion = () => {
        const requiredFields = [
            profileData.firstName,
            profileData.lastName,
            profileData.email,
            profileData.phone,
            profileData.jobTitle,
            profileData.company,
            profileData.bio,
            profileData.socials.website,
            profileData.socials.linkedin,
            profileData.socials.github,
        ];

        const filled = requiredFields.filter(
            (field) => field && field.trim() !== ""
        ).length;

        return Math.round((filled / requiredFields.length) * 100);
    };

    const completionPercentage = calculateCompletion();
    const isNearlyComplete = completionPercentage >= 80;


    const handleSubmit = () => {
        console.log("✅ FINAL SUBMITTED PROFILE DATA:", profileData);
        alert("Check console for full submitted data");
    };

    return (
        <div className="space-y-6">
            <div className="p-8 border rounded-3xl bg-white shadow-sm space-y-6">
                <h3 className="text-xl  text-[#1E1E1E]">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        ["firstName", "First Name"],
                        ["lastName", "Last Name"],
                        ["email", "Email Address"],
                        ["phone", "Phone Number"],
                        ["jobTitle", "Job Title"],
                        ["location", "Location"],
                        ["grade", "Grade"],
                        ["company", "Company"],
                    ].map(([id, label]) => (
                        <div key={id} className="space-y-2">
                            <Label htmlFor={id} className="text-[#364153]">{label}</Label>
                            <Input
                                id={id}
                                value={(profileData as any)[id]}
                                onChange={handleInputChange}
                                placeholder={`Enter your ${label.toLowerCase()}`}
                                className="bg-slate-50 border-none h-12 rounded-xl placeholder:text-slate-400"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="bg-slate-50 border-none min-h-[100px] rounded-xl placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="p-8 border rounded-3xl bg-white shadow-sm space-y-6">
                <h3 className="text-xl  text-[#1E1E1E]">Social Links</h3>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <Input
                            id="website"
                            value={profileData.socials.website}
                            onChange={handleSocialChange}
                            placeholder="Website"
                            className="bg-slate-50 border-none h-12 rounded-xl placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Linkedin className="w-5 h-5 text-slate-400" />
                        <Input
                            id="linkedin"
                            value={profileData.socials.linkedin}
                            onChange={handleSocialChange}
                            placeholder="LinkedIn profile"
                            className="bg-slate-50 border-none h-12 rounded-xl placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Github className="w-5 h-5 text-slate-400" />
                        <Input
                            id="github"
                            value={profileData.socials.github}
                            onChange={handleSocialChange}
                            placeholder="GitHub profile"
                            className="bg-slate-50 border-none h-12 rounded-xl placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] border-[#B9F8CF] border-2 rounded-3xl flex items-start gap-4">
                <div
                    className={`p-2 rounded-xl ${isNearlyComplete ? "bg-[#00A63E]" : "bg-[#00A63E]"
                        }`}
                >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 space-y-2">
                    <h4 className=" text-slate-800">Profile Completion</h4>

                    <p className="text-sm text-slate-500">
                        Complete your profile to unlock all features and improve your job matching
                    </p>

                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 ${isNearlyComplete ? "bg-[#00A63E]" : "bg-[#FFFF00]"
                                }`}
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>

                    <span className="text-sm  text-slate-700">
                        {completionPercentage}% Complete
                    </span>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSubmit}
                    className="bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-black  px-6 py-6 rounded-2xl text-lg"
                >
                    Submit All Data
                </Button>
            </div>
        </div>
    );
}
