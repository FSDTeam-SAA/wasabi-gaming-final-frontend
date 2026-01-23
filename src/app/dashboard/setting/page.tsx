"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./_components/profile-header";
import ProfileTabs from "./_components/profile-tabs";
import PersonalInfo from "./_components/personalInfo";
import { Sparkles } from "lucide-react";
import AccountSettings from "./_components/security";
import JobsTable from "./_components/job";


// Mock Data
const userData = {
    name: "John Doe",
    role: "Software Engineer",
    company: "TechCorp Inc.",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 6+ years of experience...",
    completion: 85
};

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-info");

    useEffect(() => {
        console.log("Main Page Data:", userData);
    }, []);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[30px] text-[#1E1E1E] ">Profile Settings</h1>
                    <p className="text-[#4A5565] text-[16px] ">Manage your account information and preferences</p>
                </div>
                <button className="bg-gradient-to-r from-[#F3E8FF] to-[#DBEAFE] flex items-center justify-center  text-[#8200DB] px-4 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4 mr-2" /> Premium account
                </button>
            </div>

            {/* Header Card Component */}
            <ProfileHeader data={userData} />

            {/* Tabs Navigation Component */}
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Conditional Rendering based on Tab */}
            <div className="mt-6">
                {activeTab === "personal-info" && <PersonalInfo />}
                {/* {activeTab === "preferences" && <Preferences  data={userData} />} */}
                {activeTab === "security" && <AccountSettings />}
                {activeTab === "invited" && <JobsTable />}
                {/* {activeTab === "applied" && <AppliedJobs />} */}
                {/* Baki tabs gulo eivabe add korte hobe */}
            </div>
        </div>
    );
}