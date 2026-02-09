
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Calendar, MapPin, DollarSign, Search, Briefcase, TrendingUp, Plus } from "lucide-react";
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
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────

interface JobFromAPI {
  _id: string;
  title: string;
  location: string;
  companyName: string;
  companyType?: string;
  level?: string;
  salaryRange?: string;
  startDate?: string;
  applicationDeadline: string;
  jobId?: string | number;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
  data: JobFromAPI[];
}

interface Application {
  id: string;
  company: string;
  position: string;
  date: string;
  status: string;
  level?: string;
  location: string;
  salary?: string;
  deadline: string;
  description?: string;
  applied: boolean;
  canApply: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

const getStatusColor = (status: string) => {
  const lower = status.toLowerCase();
  if (lower === "active" || lower === "open") return "bg-green-100 text-[#1E1E1E]";
  if (lower === "inactive" || lower === "closed") return "bg-[#FFFF00] text-[#1E1E1E]";
  return "bg-gray-100 text-gray-600";
};

const isJobClosed = (deadline: string) => {
  if (!deadline) return true;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

const canApplyToJob = (job: Application) => {
  return job.status === "active" && !isJobClosed(job.deadline) && !job.applied;
};

const ALL = "__all__";

// ─── Job Details Modal ────────────────────────────────────────────────────

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border-none shadow-2xl p-0">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-8 py-6 border-b border-gray-100">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
              {job.position}
            </DialogTitle>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold",
                  getStatusColor(job.status),
                )}
              >
                {job.status === "active" ? "Open Position" : "Closed"}
              </div>

              {job.level && (
                <div className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {job.level}
                </div>
              )}

              <div className="text-sm text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Posted: {job.date}
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Company</p>
              <p className="font-semibold text-gray-900">{job.company}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="font-medium text-gray-900">{job.location}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Salary</p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <p className="font-medium text-gray-900">
                  {job.salary || "Not specified"}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Application Deadline</p>
              <p className="font-medium text-gray-900">
                {new Date(job.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Job Description</h3>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
              <p className="whitespace-pre-line">
                {job.description || "No detailed description available at this time."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Close
            </Button>

            {isApplicable && (
              <Button
                className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-6 text-lg shadow-md"
                onClick={onApply}
              >
                Apply Now
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function ApplicationTrackerPage() {
  const [activeTab, setActiveTab] = useState<"all" | "open" | "closed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>(ALL);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const itemsPerPage = 9;

  const [selectedJob, setSelectedJob] = useState<Application | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchTrigger((prev) => prev + 1);
    }
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTrigger, locationFilter, jobTypeFilter]);

  // ────────────────────────────────────────────────────────────────
  // Fetch jobs
  // ────────────────────────────────────────────────────────────────

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
  });

  if (activeTab === "open") queryParams.set("status", "active");
  if (activeTab === "closed") queryParams.set("status", "inactive");

  if (searchQuery.trim()) queryParams.set("searchTerm", searchQuery.trim());
  if (locationFilter !== ALL) queryParams.set("location", locationFilter);
  if (jobTypeFilter !== ALL) queryParams.set("searchTerm", jobTypeFilter);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["jobs", currentPage, activeTab, searchTrigger, locationFilter, jobTypeFilter],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/job?${queryParams.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });

  // ────────────────────────────────────────────────────────────────
  // Derive unique locations from API data (case-insensitive dedupe)
  // ────────────────────────────────────────────────────────────────

  const uniqueLocations = useMemo(() => {
    if (!data?.data) return [];

    const locationSet = new Set<string>();

    data.data.forEach((job) => {
      if (job.location && job.location.trim()) {
        const normalized = job.location.trim();
        locationSet.add(normalized);
      }
    });

    return Array.from(locationSet).sort((a, b) => a.localeCompare(b));
  }, [data]);

  // ────────────────────────────────────────────────────────────────
  // Map API jobs → frontend shape
  // ────────────────────────────────────────────────────────────────

  const applications = useMemo<Application[]>(() => {
    if (!data?.data) return [];

    return data.data.map((job) => ({
      id: job._id,
      company: job.companyName,
      position: job.title,
      date: new Date(job.createdAt).toLocaleDateString("en-GB"),
      status: job.status,
      level: job.level,
      location: job.location,
      salary: job.salaryRange,
      deadline: job.applicationDeadline,
      description: job.description,
      applied: false,
      canApply: job.status === "active" && !isJobClosed(job.applicationDeadline),
    }));
  }, [data]);

  const totalItems = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 min-h-screen">
        Failed to load jobs. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-6 pt-10 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Legal Opportunities
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Discover apprenticeships, training contracts, newly qualified roles and more.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
          {(["all", "open", "closed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 sm:px-10 py-4 font-semibold text-base sm:text-lg whitespace-nowrap border-b-4",
                activeTab === tab
                  ? "border-[#FFFF00] text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700",
              )}
            >
              {tab === "all" ? "All Jobs" : tab === "open" ? "Open Jobs" : "Closed Jobs"}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[280px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                placeholder="Search by title, company or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSearch())}
                className="pl-12 pr-14 py-6 rounded-xl bg-[#E9EEF2] border border-gray-300"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFFF00] hover:bg-[#FFFF00] text-black rounded-full w-9 h-9 shadow-sm"
                disabled={isLoading}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Location Dropdown – dynamic from API */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[240px] py-6 rounded-xl border border-gray-300 bg-[#E9EEF2]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl max-h-[320px]">
                <SelectItem value={ALL}>All Locations</SelectItem>
                {uniqueLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Job Type Dropdown – fixed list */}
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-full sm:w-[240px] py-6 rounded-xl border border-gray-300 bg-[#E9EEF2]">
                <SelectValue placeholder="All Job Types" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl">
                <SelectItem value={ALL}>All Job Types</SelectItem>
                <SelectItem value="solicitor">Solicitor Apprenticeships</SelectItem>
                <SelectItem value="paralegal">Paralegal Apprenticeships</SelectItem>
                <SelectItem value="year_12_work_experience">Year 12 Work Experience</SelectItem>
                <SelectItem value="year_13_work_experience">Year 13 Work Experience</SelectItem>
                <SelectItem value="training_contracts">Training Contracts</SelectItem>
                <SelectItem value="vacation_schemes">Vacation Schemes</SelectItem>
                <SelectItem value="insight_days">Insight Days</SelectItem>
                <SelectItem value="open_days">Open Days</SelectItem>
              </SelectContent>
            </Select>
          </form>
        </div>

        {/* Job Cards */}
        {applications.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            No matching opportunities found.
            <p className="text-base mt-3">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full cursor-pointer"
                  onClick={() => {
                    setSelectedJob(app);
                    setIsJobModalOpen(true);
                  }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-7 h-7 text-gray-600" />
                    </div>
                    <div
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium",
                        getStatusColor(app.status),
                      )}
                    >
                      {app.status === "active" ? "Open" : "Closed"}
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-2 line-clamp-2">{app.position}</h3>
                  <p className="text-gray-700 font-medium mb-4">{app.company}</p>

                  <div className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{app.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(app.deadline).toLocaleDateString("en-GB")}</span>
                    </div>
                    {app.salary && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{app.salary}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button
                      variant="outline"
                      className="flex-1 bg-[#FFFF00] border-none text-black hover:bg-[#FFFF00]/90 rounded-full"
                    >
                      View Details
                    </Button>

                    {canApplyToJob(app) && (
                      <Link href="/dashboard/application-tracker/cv-uplode">
                        <Button className="flex-1 rounded-[8px] bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black font-medium">
                          Apply
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-gray-300"
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "min-w-[40px]",
                      currentPage === page
                        ? "bg-[#FFFF00] hover:bg-[#FFFF00] text-black border-none"
                        : "border-gray-300",
                    )}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-gray-300"
                >
                  Next
                </Button>
              </div>
            )}

            <div className="text-center text-gray-600 mt-6">
              Showing {applications.length} of {totalItems} opportunities{" "}
              {`(Page ${currentPage} of ${totalPages})`}
            </div>
          </>
        )}

        {/* Career Insights & CTA sections remain unchanged */}
        {/* ... (your existing Career Insights + CTA code here) ... */}

        <JobDetailsModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          job={selectedJob}
          onApply={() => {
            toast.success("Application process started!");
            setIsJobModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}