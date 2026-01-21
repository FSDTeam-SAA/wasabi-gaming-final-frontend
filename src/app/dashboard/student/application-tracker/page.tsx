"use client";

import React, { useState, useMemo } from "react";
import {
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
    DollarSign,
    Search,
    Plus,
    FolderOpen,
    X,
    Edit2,
    UploadCloud,
    Briefcase,
    AlertCircle,
    Download,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

// --- Types ---
interface Application {
    id: number;
    company: string;
    position: string;
    date: string;
    status: string;
    userStatus?: string;
    note?: string;
    hasNote?: boolean;
    level?: string;
    location?: string;
    industry?: string;
    salary?: string;
    startDate?: string;
    deadline?: string;
    jobId?: string;
    applied: boolean;
    canApply?: boolean;
}

// --- Constants & Data ---
const statsData = [
    {
        icon: <FileText className="w-6 h-6" />,
        label: "Applications Sent",
        value: "10",
        subtitle: "Great start!",
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        label: "Interviews Scheduled",
        value: "3",
        subtitle: "You're making progress!",
    },
    {
        icon: <CheckCircle className="w-6 h-6" />,
        label: "Offers Received",
        value: "1",
        subtitle: "Success is near!",
    },
    {
        icon: <Clock className="w-6 h-6" />,
        label: "Pending Responses",
        value: "5",
        subtitle: "Keep applying!",
    },
];

const statusOptions = [
    "Applied",
    "Under Review",
    "Interview Scheduled",
    "Interview Completed",
    "Offer Received",
    "Rejected",
    "Accepted",
];

const finalStatuses = ["Rejected", "Accepted", "Offer Received"];

const allApplicationsData: Application[] = [
    {
        id: 1,
        company: "JIES LEGAL SERVICES LIMITED",
        position: "Legal Assistant Apprentice",
        date: "Oct 1, 2025",
        status: "Not Applied",
        note: "Apply before deadline",
        hasNote: true,
        level: "Level 6",
        location: "South East",
        industry: "Law",
        salary: "$15,704.00 - $15,704.00 Yearly",
        startDate: "1/5/2026",
        deadline: "1/10/2026",
        jobId: "9040",
        applied: false,
        canApply: true,
    },
    {
        id: 2,
        company: "Tech Law Firm",
        position: "Junior Legal Tech Associate",
        date: "Nov 15, 2025",
        status: "Not Applied",
        note: "High growth opportunity",
        hasNote: true,
        deadline: "12/28/2025",
        applied: false,
        canApply: true,
    },
    {
        id: 3,
        company: "Smith & Partners LLP",
        position: "Junior Associate",
        date: "Nov 15, 2025",
        status: "Under Review",
        note: "Application submitted successfully",
        hasNote: true,
        deadline: "12/20/2025",
        applied: true,
        canApply: false,
        userStatus: "Under Review",
    },
    {
        id: 4,
        company: "Johnson Legal Group",
        position: "Paralegal",
        date: "Dec 10, 2025",
        status: "Interview Scheduled",
        note: "Interview scheduled for Dec 28, 2025",
        hasNote: true,
        deadline: "1/5/2026",
        applied: true,
        canApply: false,
        userStatus: "Interview Scheduled",
    },
    {
        id: 5,
        company: "Davis Moore Attorneys",
        position: "Legal Assistant",
        date: "Sep 25, 2025",
        status: "Rejected",
        note: "Position filled internally",
        hasNote: true,
        deadline: "10/15/2025",
        applied: true,
        canApply: false,
        userStatus: "Rejected",
    },
    {
        id: 6,
        company: "Carter & Wells",
        position: "Summer Clerk",
        date: "Nov 20, 2025",
        status: "Offer Received",
        note: "Conditional offer pending reference check",
        hasNote: true,
        deadline: "12/28/2025",
        applied: true,
        canApply: false,
        userStatus: "Offer Received",
    },
    {
        id: 7,
        company: "Elite Law Chambers",
        position: "Intellectual Property Associate",
        date: "Dec 5, 2025",
        status: "Expired",
        note: "Application deadline has passed",
        hasNote: true,
        deadline: "12/20/2025",
        applied: false,
        canApply: false,
    },
    {
        id: 8,
        company: "City Legal Services",
        position: "Compliance Officer",
        date: "Nov 30, 2025",
        status: "Expired",
        note: "Position no longer available",
        hasNote: true,
        deadline: "12/20/2025",
        applied: false,
        canApply: false,
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Offer Received":
        case "Accepted":
            return "bg-green-100 text-green-700";
        case "Interview Scheduled":
            return "bg-blue-100 text-blue-700";
        case "Under Review":
            return "bg-amber-100 text-amber-800";
        case "Rejected":
            return "bg-red-100 text-red-700";
        case "Applied":
            return "bg-gray-100 text-gray-700";
        case "Not Applied":
            return "bg-gray-100 text-gray-500";
        case "Expired":
            return "bg-gray-200 text-gray-500";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

const isJobClosed = (job: Application) => {
    if (!job.deadline) return false;
    // Hardcoded 'today' from original code: "2025-12-23"
    // Assuming we might want real date, but keeping logic consistent with migration
    const today = new Date("2025-12-23");
    const deadline = new Date(job.deadline);
    return deadline < today;
};

const canApplyToJob = (job: Application) => {
    return !isJobClosed(job) && !job.applied;
};

const canChangeStatus = (status?: string) => {
    return !finalStatuses.includes(status || "");
};

// --- Components ---

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", className)}>
            {children}
        </span>
    );
}

// Job Details Modal
function JobDetailsModal({
    isOpen,
    onClose,
    job,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: Application | null;
    onApply: () => void;
}) {
    if (!job) return null;
    const isApplicable = canApplyToJob(job);
    const status = job.userStatus || job.status;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-bold mb-2">{job.position}</DialogTitle>
                            <div className="flex items-center gap-2">
                                <Badge className={isApplicable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                    {isApplicable ? "Open" : "Closed"}
                                </Badge>
                                <span className="text-gray-500 text-sm">{job.level || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4 border-b">
                    <div>
                        <span className="text-sm text-gray-500 block">Company</span>
                        <span className="font-medium">{job.company}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block">Location</span>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{job.location || "Not specified"}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block">Industry</span>
                        <span>{job.industry || "Not specified"}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block">Salary</span>
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span>{job.salary || "Not specified"}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-b">
                    <div>
                        <span className="text-sm text-gray-500 block">Start Date</span>
                        <span>{job.startDate || "Not specified"}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block">Deadline</span>
                        <span>{job.deadline || "Not specified"}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block">Job ID</span>
                        <span>{job.jobId || "N/A"}</span>
                    </div>
                </div>

                {!job.applied && (
                    <div className="py-4 border-b">
                        <Button
                            className={cn("w-full font-semibold", isApplicable ? "bg-[#ffff00] text-black hover:bg-[#e6e600]" : "bg-gray-200 text-gray-400")}
                            onClick={isApplicable ? onApply : undefined}
                            disabled={!isApplicable}
                        >
                            {isApplicable ? "Apply Now" : "Application Closed"}
                        </Button>
                        {!isApplicable && (
                            <p className="text-red-500 text-sm mt-2 text-center">This application is closed.</p>
                        )}
                    </div>
                )}

                {job.applied && (
                    <div className="py-4 border-b">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-blue-700">You have applied to this position</span>
                            </div>
                            <div className="text-sm text-blue-600 flex items-center gap-2">
                                Current Status:
                                <Badge className={getStatusColor(status)}>{status}</Badge>
                            </div>
                        </div>
                    </div>
                )}

                <div className="py-4">
                    <h3 className="font-bold text-lg mb-2">About The Job</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Reporting directly to JLES Legal Services Manager, you will take on responsibilities to manage and oversee legal hindrances to highway and sewer adoptions! Liaising with local authorities, clients and third parties legal teams as required. Negotiating legal requirements...
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// CV Upload Modal
function CVUploadModal({
    isOpen,
    onClose,
    job,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: Application | null;
    onSuccess: () => void;
}) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (!file) {
            toast.error("Please upload your CV!");
            return;
        }
        toast.success("Application submitted successfully!");
        setFile(null);
        onSuccess();
        onClose();
    };

    const handleUseBuiltResume = () => {
        toast.info("Using built-in resume...");
        handleSubmit(); // Simulating instant submission
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Apply to {job?.position}</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-yellow-50/50 border-2 border-dashed border-yellow-200 rounded-xl text-center">
                    <div className="bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UploadCloud className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-semibold mb-1">Upload Your CV</h3>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (Max 5MB)</p>

                    <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    {file && <p className="mt-2 text-sm text-green-600 font-medium">{file.name}</p>}
                </div>

                <DialogFooter className="flex-col gap-2 sm:gap-2">
                    <Button onClick={handleSubmit} disabled={!file} className="w-full bg-[#ffff00] text-black hover:bg-[#e6e600]">
                        Submit Application
                    </Button>
                    <Button variant="outline" onClick={handleUseBuiltResume} className="w-full">
                        Use Built Resume
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Status Change Modal
function StatusChangeModal({
    isOpen,
    onClose,
    job,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: Application | null;
    onSave: (status: string) => void;
}) {
    const [selectedStatus, setSelectedStatus] = useState(job?.userStatus || job?.status || "");

    if (!job) return null;

    const handleSave = () => {
        onSave(selectedStatus);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div>
                        <p className="font-semibold">{job.position}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">New Status</label>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(opt => (
                                    <SelectItem key={opt} value={opt} disabled={finalStatuses.includes(opt) && finalStatuses.includes(job.userStatus || "")}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {finalStatuses.includes(selectedStatus) && (
                        <div className="p-3 bg-yellow-50 text-yellow-800 text-sm rounded-md border border-yellow-200">
                            Warning: Found final status selection. Cannot be undone.
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button onClick={handleSave} className="w-full bg-[#ffff00] text-black hover:bg-[#e6e600]">
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Stats Card
function StatCard({ icon, value, label, subtitle }: { icon: React.ReactNode, value: string, label: string, subtitle: string }) {
    return (
        <div className="bg-white border-2 border-[#ffffb2] rounded-[20px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#ffff00] flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold">{value}</h3>
                <p className="font-medium text-gray-600">{label}</p>
                <p className="text-xs text-gray-400 mt-1 italic">{subtitle}</p>
            </div>
        </div>
    )
}

// --- Main Page Component ---

export default function ApplicationTrackerPage() {
    const [activeTab, setActiveTab] = useState<"open" | "myApplications" | "closed">("open");
    const [searchText, setSearchText] = useState("");
    const [applications, setApplications] = useState<Application[]>(allApplicationsData);

    const [selectedJob, setSelectedJob] = useState<Application | null>(null);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    // Computed
    const filteredApplications = useMemo(() => {
        let filtered = applications;

        if (searchText.trim()) {
            const lower = searchText.toLowerCase();
            filtered = filtered.filter(app =>
                app.company.toLowerCase().includes(lower) ||
                app.position.toLowerCase().includes(lower)
            );
        }

        if (activeTab === "open") {
            return filtered.filter(app => !app.applied && !isJobClosed(app));
        } else if (activeTab === "myApplications") {
            return filtered.filter(app => app.applied && !isJobClosed(app));
        } else if (activeTab === "closed") {
            return filtered.filter(app => isJobClosed(app));
        }
        return filtered;
    }, [applications, searchText, activeTab]);

    // Handlers
    const handleApplySuccess = () => {
        if (selectedJob) {
            setApplications(prev => prev.map(app =>
                app.id === selectedJob.id
                    ? { ...app, applied: true, status: "Applied", userStatus: "Applied", canApply: false }
                    : app
            ));
        }
    };

    const handleStatusChange = (status: string) => {
        if (selectedJob) {
            setApplications(prev => prev.map(app =>
                app.id === selectedJob.id
                    ? { ...app, userStatus: status, status: status }
                    : app
            ));
            toast.success(`Status updated to ${status}`);
        }
    }

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold main-color mb-2">Application Tracker</h1>
                    <p className="text-gray-600">Track and manage your applications, from open opportunities to completed ones.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search by company or position..."
                        className="pl-10 h-12 rounded-2xl bg-gray-50 border-transparent focus:border-yellow-400 focus:bg-white transition-all"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                {(["open", "myApplications", "closed"] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-3 font-medium text-sm transition-colors border-b-2 -mb-px",
                            activeTab === tab
                                ? "border-[#ffff00] text-black"
                                : "border-transparent text-gray-500 hover:text-gray-800"
                        )}
                    >
                        {tab === "open" && "Open Applications"}
                        {tab === "myApplications" && "My Applications"}
                        {tab === "closed" && "Closed Applications"}
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                    {activeTab === "open" && "Open Applications"}
                    {activeTab === "myApplications" && "My Applications"}
                    {activeTab === "closed" && "Closed Applications"}
                </h2>

                {filteredApplications.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No applications found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApplications.map(app => {
                            const isApplicable = canApplyToJob(app);
                            const status = app.userStatus || app.status;
                            const isChangeable = app.applied && canChangeStatus(status) && !isJobClosed(app);

                            return (
                                <div key={app.id} className="border-2 rounded-[20px] p-6 hover:shadow-lg transition-all bg-white flex flex-col gap-4 cursor-pointer" onClick={() => { setSelectedJob(app); setIsJobModalOpen(true); }}>
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-gray-500" />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={getStatusColor(status)}>{status}</Badge>
                                            {isChangeable && (
                                                <button
                                                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-black"
                                                    onClick={(e) => { e.stopPropagation(); setSelectedJob(app); setIsStatusModalOpen(true); }}
                                                >
                                                    <Edit2 className="w-3 h-3" /> Change
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg">{app.company}</h3>
                                        <p className="text-gray-600">{app.position}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        {app.date}
                                    </div>

                                    {app.note && app.hasNote && (
                                        <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600">
                                            {app.note}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4 border-t flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-yellow-400 text-black hover:bg-yellow-50"
                                            onClick={(e) => { e.stopPropagation(); setSelectedJob(app); setIsJobModalOpen(true); }}
                                        >
                                            View Details
                                        </Button>
                                        {!app.applied && isApplicable && (
                                            <Button
                                                className="flex-1 bg-[#ffff00] text-black hover:bg-[#e6e600]"
                                                onClick={(e) => { e.stopPropagation(); setSelectedJob(app); setIsCVModalOpen(true); }}
                                            >
                                                Apply
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Modals */}
            <JobDetailsModal
                isOpen={isJobModalOpen}
                onClose={() => setIsJobModalOpen(false)}
                job={selectedJob}
                onApply={() => { setIsJobModalOpen(false); setIsCVModalOpen(true); }}
            />
            <CVUploadModal
                isOpen={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
                job={selectedJob}
                onSuccess={handleApplySuccess}
            />
            <StatusChangeModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                job={selectedJob}
                onSave={handleStatusChange}
            />
        </div>
    );
}
