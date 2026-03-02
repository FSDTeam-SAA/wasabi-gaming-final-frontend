// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";
// import { Plus, X } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // ── Form Data Type ────────────────────────────────────────────────
// interface ManualJobFormData {
//   title: string;
//   location: string;
//   companyName: string;
//   companyType: string;
//   postedBy: string;
//   level: string;
//   salaryRange: string;
//   startDate: string;
//   applicationDeadline: string;
//   description: string;
//   additionalInfo: string;
//   requiredSkills: string[];
// }

// interface AddManualJobModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function AddManualJobModal({
//   open,
//   onOpenChange,
// }: AddManualJobModalProps) {
//   const labelClass = "block text-base font-medium text-[#1E1E1E] mb-1.5";
//   const fieldClass =
//     "w-full h-[48px] rounded-[4px] border border-[#0000001A] px-4 outline-none focus:border-black focus:ring-1 focus:ring-black";

//   const queryClient = useQueryClient();

//   const [formData, setFormData] = useState<ManualJobFormData>({
//     title: "",
//     location: "",
//     companyName: "",
//     companyType: "",
//     postedBy: "",
//     level: "",
//     salaryRange: "",
//     startDate: "",
//     applicationDeadline: "",
//     description: "",
//     additionalInfo: "",
//     requiredSkills: [],
//   });
//   const [skillInput, setSkillInput] = useState("");
//   const session = useSession();
//   const token = session?.data?.accessToken;
//   const mutation = useMutation({
//     mutationFn: async (data: ManualJobFormData) => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/manual-job`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.message || `Request failed (${res.status})`);
//       }

//       return res.json();
//     },

//     onSuccess: (response) => {
//       // Invalidate whatever query shows your applications list
//       queryClient.invalidateQueries({ queryKey: ["applications"] });
//       // queryClient.invalidateQueries({ queryKey: ["jobs"] });
//       // queryClient.invalidateQueries({ queryKey: ["my-jobs"] });

//       toast.success(response?.message || "Job application added successfully");
//       onOpenChange(false);
//     },

//     onError: (err: Error) => {
//       console.error("Failed to add job:", err);
//       // toast.error(err.message || "Could not save application")
//     },
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const cleanDescription = formData.description.replace(/<[^>]*>/g, "").trim();
//     if (!cleanDescription) {
//       toast.error("Job description is required");
//       return;
//     }

//     let finalSkills = [...formData.requiredSkills];
//     const pendingSkill = skillInput.trim();

//     if (pendingSkill && !finalSkills.includes(pendingSkill)) {
//       finalSkills = [...finalSkills, pendingSkill];
//     }

//     const payload: ManualJobFormData = {
//       ...formData,
//       requiredSkills: finalSkills,
//     };

//     setFormData(payload);
//     setSkillInput("");
//     mutation.mutate(payload);
//   };

//   const handleAddSkill = () => {
//     const skill = skillInput.trim();
//     if (!skill) return;
//     if (formData.requiredSkills.includes(skill)) {
//       setSkillInput("");
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       requiredSkills: [...prev.requiredSkills, skill],
//     }));
//     setSkillInput("");
//   };

//   const handleRemoveSkill = (skillToRemove: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       requiredSkills: prev.requiredSkills.filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto hide-scrollbar">
//         {/* Header */}
//         <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4  bg-white rounded-t-2xl">
//           <h3 className="text-xl font-semibold text-gray-900">
//             Add New Job Application
//           </h3>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             aria-label="Close"
//           >
//             <X className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className={labelClass}>
//                 Job Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className={fieldClass}
//                 placeholder="e.g. Backend Developer"
//               />
//             </div>

//             <div>
//               <label className={labelClass}>
//                 Location
//               </label>
//               <input
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className={fieldClass}
//                 placeholder="e.g. Dhaka, Bangladesh"
//               />
//             </div>

//             <div>
//               <label className={labelClass}>
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className={fieldClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>
//                 Level
//               </label>
//               <select
//                 name="level"
//                 value={formData.level}
//                 onChange={handleChange}
//                 className={`${fieldClass} bg-white`}
//               >
//                 <option value="">Select level</option>
//                 <option value="Entry-Level">Entry-Level</option>
//                 <option value="Mid-Level">Mid-Level</option>
//                 <option value="Senior">Senior</option>
//                 <option value="Lead/Principal">Lead/Principal</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>
//                 Salary Range
//               </label>
//               <input
//                 name="salaryRange"
//                 value={formData.salaryRange}
//                 onChange={handleChange}
//                 className={fieldClass}
//                 placeholder="e.g. 40,000 - 60,000 BDT"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={fieldClass}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>
//                 Application Deadline
//               </label>
//               <input
//                 type="date"
//                 name="applicationDeadline"
//                 value={formData.applicationDeadline}
//                 onChange={handleChange}
//                 className={fieldClass}
//               />
//             </div>
//           </div>

//           <div>
//             <label className={labelClass}>
//               Job Description <span className="text-red-500">*</span>
//             </label>
//             <div className="rounded-[4px] border border-[#0000001A] overflow-hidden">
//               <ReactQuill
//                 className="manual-job-description-editor"
//                 theme="snow"
//                 value={formData.description}
//                 onChange={(value) =>
//                   setFormData((prev) => ({ ...prev, description: value }))
//                 }
//                 placeholder="Responsibilities, requirements, what you're looking for..."
//               />
//             </div>
//           </div>

//           <div>
//             <label className={labelClass}>
//               Required Skills
//             </label>
//             <div className="flex items-center gap-2">
//               <input
//                 value={skillInput}
//                 onChange={(e) => setSkillInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleAddSkill();
//                   }
//                 }}
//                 className={fieldClass}
//                 placeholder="Type a skill and press Enter"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddSkill}
//                 className="h-[48px] w-[48px] shrink-0 rounded-[4px] border border-[#0000001A] flex items-center justify-center text-[#1E1E1E] hover:bg-[#F9FAFB]"
//                 aria-label="Add skill"
//               >
//                 <Plus className="h-4 w-4" />
//               </button>
//             </div>
//             {formData.requiredSkills.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {formData.requiredSkills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="inline-flex items-center gap-2 rounded-[4px] border border-[#0000001A] bg-[#F9FAFB] px-2 py-1 text-sm text-[#1E1E1E]"
//                   >
//                     {skill}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveSkill(skill)}
//                       className="text-[#1E1E1E] leading-none"
//                       aria-label={`Remove ${skill}`}
//                     >
//                       x
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end  first-letter: gap-4 pt-6 ">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               disabled={mutation.isPending}
//               className="h-[48px] rounded-[8px] px-5"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={mutation.isPending}
//               className="bg-[#FFFF00] h-[48px] text-[#1E1E1E] hover:bg-[#FFFF00]/90 rounded-[8px] min-w-[140px]"
//             >
//               {mutation.isPending ? "Saving..." : "Add Application"}
//             </Button>
//           </div>
//         </form>
//       </div>
//       <style jsx global>{`
//         .manual-job-description-editor .ql-container {
//           height: 300px;
//         }
//       `}</style>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// ── Form Data Type ────────────────────────────────────────────────
interface ManualJobFormData {
  title: string;
  location: string;
  companyName: string;
  companyType: string;
  postedBy: string;
  level: string;
  salaryRange: string;
  startDate: string;
  applicationDeadline: string;
  url: string;
  additionalInfo: string;
}

interface AddManualJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddManualJobModal({
  open,
  onOpenChange,
}: AddManualJobModalProps) {
  const labelClass = "block text-base font-medium text-[#1E1E1E] mb-1.5";
  const fieldClass =
    "w-full h-[48px] rounded-[4px] border border-[#0000001A] px-4 outline-none focus:border-black focus:ring-1 focus:ring-black";

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ManualJobFormData>({
    title: "",
    location: "",
    companyName: "",
    companyType: "",
    postedBy: "",
    level: "",
    salaryRange: "",
    startDate: "",
    applicationDeadline: "",
    url: "",
    additionalInfo: "",
  });

  const session = useSession();
  const token = session?.data?.accessToken;

  const mutation = useMutation({
    mutationFn: async (data: ManualJobFormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/manual-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Request failed (${res.status})`);
      }

      return res.json();
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success(response?.message || "Job application added successfully");
      onOpenChange(false);
    },

    onError: (err: Error) => {
      console.error("Failed to add job:", err);
      toast.error(err.message || "Could not save application");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    mutation.mutate(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-white rounded-t-xl sm:rounded-t-2xl">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Add New Job Application
          </h3>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className={labelClass}>
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. Solicitor Apprentice"
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. London, UK"
              />
            </div>

            <div>
              <label className={labelClass}>
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. Your Company Ltd"
              />
            </div>

            <div>
              <label className={labelClass}>Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={`${fieldClass} bg-white`}
              >
                <option value="">Select level</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead/Principal">Lead/Principal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Salary Range</label>
              <input
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. £18,000 - £22,000"
              />
            </div>

            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              URL <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={fieldClass}
              placeholder="https://example.com/job-post"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
              className="h-[48px] rounded-[8px] px-5 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#FFFF00] h-[48px] text-[#1E1E1E] hover:bg-[#FFFF00]/90 rounded-[8px] min-w-[140px] w-full sm:w-auto"
            >
              {mutation.isPending ? "Saving..." : "Add Application"}
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}
