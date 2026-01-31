'use client';

import React, { useState } from "react";
// import { InvitationTabs } from "@/components/school/invite-students/InvitationTabs";
import { InvitationContent } from "@/components/school/invite-students/InvitationContent";
import { RecentInvitations } from "./_components/recent-invitations";
import StartBuildingYourStudent from "./_components/start-building-your-student";
import InviteStudents from "./_components/invite-students";

export default function InviteStudentsPage() {
    const [activeTab, setActiveTab] = useState("single");

    return (
        <main className="space-y-12 min-h-screen">

            <InviteStudents/>

            {/* <InvitationTabs onTabChange={setActiveTab} /> */}
            <InvitationContent activeTab={activeTab} />



            <RecentInvitations/>
            <StartBuildingYourStudent/>
        </main>
    );
}
