'use client';

import React, { useState } from "react";
import { InvitationTabs } from "@/components/school/invite-students/InvitationTabs";
import { InvitationContent } from "@/components/school/invite-students/InvitationContent";

export default function InviteStudentsPage() {
    const [activeTab, setActiveTab] = useState("single");

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 min-h-screen">
            <InvitationTabs onTabChange={setActiveTab} />
            <InvitationContent activeTab={activeTab} />
        </main>
    );
}
