import React from "react";
import { ICONS } from "../../../assets";

const stats = [
    { icon: ICONS.addUser, label: "Total Students", value: 6 },
    { icon: ICONS.progressIcon, label: "Active Applications", value: 73 },
    {
        icon: ICONS.assessmentComple,
        label: "Assessment Completion Overview",
        value: 325,
    },
    { icon: ICONS.progressIcon, label: "Avg Progress", value: "81%" },
];

export default function ManageStudentsHeader() {
    return (
        <div className="font-poppins">
            <div className="mb-2 bg-[#FFFEF0]">
                <div className="px-6 py-16">
                    <h1 className="text-2xl md:text-4xl font-bold">Manage Students</h1>
                    <p className="md:text-lg mt-4 text-[#666666]">
                        Track, monitor, and support every student's career journey in one
                        central dashboard
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12 px-6">
                {stats.map((s, i) => (
                    <div key={i} className="p-6 rounded-3xl shadow-sm bg-[#FFFEF0] border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-4">
                            <img src={s.icon} alt="icon" className="w-10 h-10 object-contain" />
                            <p className="bg-yellow-400 text-2xl font-bold rounded-2xl py-3 px-4">{s.value}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-600 mt-6">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
