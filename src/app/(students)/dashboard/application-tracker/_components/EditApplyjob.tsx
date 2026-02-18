"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Building2,
  SquarePen,
  X,
  CalendarDays,
  UserRound,
  ExternalLink,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

interface EditApplyjobProps {
  id: string;
}

interface Job {
  _id: string;
  companyName: string;
  companyType: string | null;
  title: string;
  status: string;
  dateApplied?: string;
  contactPerson?: string;
  notes?: string;
  jobPostingUrl?: string;
  url?: string;
}

const STATUS_PROGRESS: Record<string, number> = {
  Applied: 25,
  Interview: 50,
  Offer: 100,
  Rejected: 0,
};

export default function EditApplyjob({ id }: EditApplyjobProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const session = useSession();
  const token = session?.data?.accessToken;

  const {
    data: companyData,
    isLoading,
    error,
  } = useQuery<Job>({
    queryKey: ["companydata", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch job data");
      const result = await res.json();
      return result.data;
    },
    enabled: !!id && isOpen,
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/application-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            date,
            notes,
          }),
        },
      );

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Failed to update application");

      return result;
    },
    onSuccess: () => {
      toast.success("Application updated successfully");
      setIsOpen(false);
      setStatus("");
      setNotes("");
    },
    onError: (err: any) => {
      toast.error(err.message || "Update failed");
    },
  });

  const currentStatus = status || companyData?.status || "Applied";
  const progress = STATUS_PROGRESS[currentStatus] ?? 25;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="h-[36px] w-[36px] flex items-center justify-center rounded-[12px] border border-gray-300 hover:bg-gray-100 transition">
          <SquarePen className="w-4 h-4 text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          border-none
          shadow-2xl
          bg-transparent              
          p-0
          [&>button]:hidden
          w-full
          max-w-[520px]
          sm:rounded-3xl               
        "
      >
        {/* Inner wrapper – this almost always fixes rounding issues */}
        <div className="rounded-3xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-[32px]">
              <h2 className="text-[24px] font-semibold text-[#1E1E1E] leading-[32px]">
                Application Details
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isLoading && (
              <p className="text-sm text-gray-400 mb-4">Loading...</p>
            )}
            {error && (
              <p className="text-sm text-red-400 mb-4">
                Failed to load job information
              </p>
            )}

            {companyData && (
              <div className="flex items-start gap-4 mb-5">
                <div className="w-[56px] h-[56px] rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Building2 size={28} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="text-[20xp] font-semibold text-[#1E1E1E] leading-[28px]">
                    {companyData.companyName}
                  </h3>
                  <p className="text-base font-normal leading-[24px] text-[#4A5565]">
                    {companyData.title || companyData.companyType || "Position"}
                  </p>
                  <span className="inline-flex items-center mt-2 px-3 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-[#FFDF20]">
                    {currentStatus}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-5">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-500 font-medium">
                  Application Progress
                </span>
                <span className="font-bold text-gray-800">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-[#FFFF00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-50 rounded-xl p-3.5 flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">
                    Date Applied
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {new Date(date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3.5 flex items-start gap-3">
                <UserRound className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">
                    Contact Person
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {companyData?.contactPerson || "HR Department"}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-[14px] font-normal leading-[20px] text-[#4A5565] mb-2">
                  Update Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-5">
                <p className="text-[14px] font-normal leading-[20px] text-[#4A5565] mb-2">
                  Notes & Next Steps
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none h-[100px] border-0"
                />
              </div>

              <div className="border-2 border-[#FFFF00] rounded-2xl px-5 py-3.5 text-center mb-5 bg-[#FFFEF0]">
                <p className="text-sm text-gray-700 italic font-medium">
                  "You're one step closer to your goal — stay confident!"
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-[50%] h-[36px] rounded-xl bg-[#FFFF00] hover:bg-[#f5f502] text-sm font-medium text-[#1E1E1E] transition disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Status"}
                </button>

                <Link
                  href={companyData?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[50%] gap-2 px-5 h-[36px] rounded-xl border-2 border-gray-200 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Job Posting
                </Link>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
