"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface EditApplyjobProps {
  id: string; // job application id
}

export default function EditApplyjob({ id }: EditApplyjobProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const session = useSession();
  const token = session?.data?.accessToken;

  // Mutation to update backend
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
          body: JSON.stringify({ status, date, notes }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update application");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setIsOpen(false);
      // optionally show toast or refetch data
    //   console.log("Application updated successfully");
      toast.success("Application updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update application");
    },
  });

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

      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Application</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <input
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Enter status"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E5E500]"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E5E500]"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes"
              className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#E5E500] resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FFFF00] hover:bg-[#f5f502] text-black"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
