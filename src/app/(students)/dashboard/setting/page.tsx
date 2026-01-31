"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./_components/profile-header";
import ProfileTabs from "./_components/profile-tabs";
import PersonalInfo from "./_components/personalInfo";
import { Sparkles, LogOut } from "lucide-react";
import AccountSettings from "./_components/security";
import JobsTable from "./_components/job";
import AppliedJobs from "./_components/applied-jobs";
import { signOut } from "next-auth/react";
import LogoutModal from "@/components/shared/LogoutModal";


export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-info");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const confirmLogout = async () => {
        await signOut({ callbackUrl: "/" });
        setIsLogoutModalOpen(false);
    };


    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[30px] text-[#1E1E1E] ">Profile Settings</h1>
                    <p className="text-[#4A5565] text-[16px] ">Manage your account information and preferences</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <button className="bg-gradient-to-r from-[#F3E8FF] to-[#DBEAFE] flex items-center justify-center  text-[#8200DB] px-4 py-1 rounded-full text-sm font-medium">
                        <Sparkles className="w-4 h-4 mr-2" /> Premium account
                    </button>
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center justify-center bg-[#FFFF00] border-2 border-[#E5E500] text-black px-6 py-2 rounded-full text-base font-bold hover:bg-[#F0F000] transition-all shadow-sm"
                    >
                        <LogOut className="w-5 h-5 mr-2" /> Logout
                    </button>
                </div>
            </div>

            {/* Header Card Component */}
            <ProfileHeader />

            {/* Tabs Navigation Component */}
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Conditional Rendering based on Tab */}
            <div className="mt-6">
                {activeTab === "personal-info" && <PersonalInfo />}
                {/* {activeTab === "preferences" && <Preferences  data={userData} />} */}
                {activeTab === "security" && <AccountSettings />}
                {activeTab === "invited" && <JobsTable />}
                {/* {activeTab === "applied" && <AppliedJobs />} */}
                {/* {activeTab === "applied" && <AppliedJobs />} */}
                {/* Baki tabs gulo eivabe add korte hobe */}
            </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onLogout={confirmLogout}
            />
        </div>
    );
}