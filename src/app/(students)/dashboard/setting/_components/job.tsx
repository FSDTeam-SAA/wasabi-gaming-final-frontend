
// // import React from "react";
// // import { Eye } from "lucide-react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Button } from "@/components/ui/button";
// // import { 
// //   Pagination, 
// //   PaginationContent, 
// //   PaginationItem, 
// //   PaginationLink, 
// //   PaginationNext, 
// //   PaginationPrevious, 
// //   PaginationEllipsis 
// // } from "@/components/ui/pagination";

// // const jobs = [
// //   { id: 1, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
// //   { id: 2, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
// //   { id: 3, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
// // ];

// // export default function JobsTable() {
// //   const handleApply = (title: string) => {
// //     console.log(`Applying for: ${title}`);
// //   };

// //   const handleView = (id: number) => {
// //     console.log(`Viewing job ID: ${id}`);
// //   };

// //   return (
// //     <div className="p-8 bg-white border rounded-xl mx-auto shadow-sm">
// //       <h2 className="text-xl  mb-6">Jobs</h2>

// //       <div className="border rounded-xl overflow-hidden">
// //         <Table>
// //           <TableHeader className="bg-gray-50/50">
// //             <TableRow >
// //               <TableHead className="font-bol  px-4 text-[#131313] py-4">Job title</TableHead>
// //               <TableHead className="font-bold px-4 text-[#131313] py-4">Job Type</TableHead>
// //               <TableHead className="font-bold px-4 text-[#131313] py-4 text-center">Deadline date</TableHead>
// //               <TableHead className="font-bold px-4 text-[#131313] py-4 text-right pr-12">Action</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {jobs.map((job) => (
// //               <TableRow key={job.id} className="hover:bg-transparent border-b">
// //                 <TableCell className="font-medium  px-4  py-6">{job.title}</TableCell>
// //                 <TableCell className="text-gray-500  px-4 ">{job.type}</TableCell>
// //                 <TableCell className="text-gray-500 text-center  px-4 ">{job.deadline}</TableCell>
// //                 <TableCell className="text-right py-4  px-4 ">
// //                   <div className="flex justify-end items-center gap-2">
// //                     <Button 
// //                       onClick={() => handleApply(job.title)}
// //                       className="bg-[#FFFF00] hover:bg-[#FFFF00] text-[#131313] h-7 px-3 rounded-full  transition-colors"
// //                     >
// //                       Apply Now
// //                     </Button>
// //                     <Button 
// //                       variant="ghost" 
// //                       size="icon" 
// //                       onClick={() => handleView(job.id)}
// //                       className="h-7 w-8 bg-[#12382B] rounded-[6px] hover:bg-[#25413c] text-white hover:text-white  flex items-center justify-center"
// //                     >
// //                       <Eye size={14} />
// //                     </Button>
// //                   </div>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>

// //         <div className="flex items-center justify-between px-6 py-4 border-t">
// //           <p className="text-xs text-gray-400">Showing 1 to 5 of 12 results</p>

// //           <Pagination className="w-auto mx-0">
// //             <PaginationContent className="gap-1">
// //               <PaginationItem>
// //                 <PaginationPrevious href="#" className="h-8 w-8 p-0 bg-gray-100 border-gray-200 rounded text-gray-400" />
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationLink href="#" isActive className="h-8 w-8 bg-[#C69345] hover:bg-[#b0823d] text-white border-none rounded">
// //                   1
// //                 </PaginationLink>
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationEllipsis className="h-8 w-8 border rounded border-gray-200 text-gray-400" />
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationLink href="#" className="h-8 w-8 border border-gray-200 rounded text-gray-600">
// //                   10
// //                 </PaginationLink>
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationNext href="#" className="h-8 w-8 p-0 border border-gray-200 rounded text-gray-600" />
// //               </PaginationItem>
// //             </PaginationContent>
// //           </Pagination>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Eye } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
//   PaginationEllipsis
// } from "@/components/ui/pagination";
// import { useQuery } from "@tanstack/react-query";

// const jobs = [
//   { id: 1, title: "Front-End Developer", type: "Full Time", deadline: "12/10/23" },
//   { id: 2, title: "Back-End Developer", type: "Full Time", deadline: "15/10/23" },
//   { id: 3, title: "UI/UX Designer", type: "Part Time", deadline: "18/10/23" },
//   { id: 4, title: "Project Manager", type: "Full Time", deadline: "20/10/23" },
//   { id: 5, title: "QA Tester", type: "Part Time", deadline: "22/10/23" },
//   { id: 6, title: "DevOps Engineer", type: "Full Time", deadline: "25/10/23" },
//   { id: 7, title: "Data Analyst", type: "Full Time", deadline: "28/10/23" },
//   { id: 8, title: "Mobile Developer", type: "Full Time", deadline: "30/10/23" },
//   { id: 9, title: "Marketing Specialist", type: "Part Time", deadline: "01/11/23" },
//   { id: 10, title: "HR Manager", type: "Full Time", deadline: "03/11/23" },
//   { id: 11, title: "Intern", type: "Part Time", deadline: "05/11/23" },
//   { id: 12, title: "Support Engineer", type: "Full Time", deadline: "07/11/23" },
// ];

// export default function JobsTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 5;
//     const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzc2ZTI5Y2Y5Zjk1MGM3ZjM1ZWRjZSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJtYWhhYnVyMTgxNDAzMUBnbWFpbC5jb20iLCJpYXQiOjE3Njk1MDc5MjAsImV4cCI6MTc3MDExMjcyMH0.4KO5RDi9REZ61c-te0haZ_Ho2HnZLSonpI32gXDkU00";

//   const handleApply = (title: string) => {
//     console.log(`Applying for: ${title}`);
//   };

//   const handleView = (id: number) => {
//     console.log(`Viewing job ID: ${id}`);
//   };


//   const { data, isLoading } = useQuery({
//     queryKey: ["all-jobs"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/match-job`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to load jobs");
//       return res.json();
//     },
//   });

//   console.log(data)

//   // Calculate pagination
//   const totalPages = Math.ceil(jobs.length / jobsPerPage);
//   const startIndex = (currentPage - 1) * jobsPerPage;
//   const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

//   const goToPage = (page: number) => {
//     if (page < 1) page = 1;
//     if (page > totalPages) page = totalPages;
//     setCurrentPage(page);
//   };



//   return (
//     <div className="p-8 bg-white border border-[#0000001A] rounded-xl mx-auto shadow-sm">
//       <h2 className="text-xl mb-6">Jobs</h2>

//       <div className="border border-[#B6B6B6] rounded-xl overflow-hidden">
//         <Table>
//           <TableHeader className="bg-gray-50/50 ">
//             <TableRow className="border-b border-[#B6B6B6]">
//               <TableHead className="font-bold px-4 text-[#131313] py-4">Job title</TableHead>
//               <TableHead className="font-bold px-4 text-[#131313] py-4">Job Type</TableHead>
//               <TableHead className="font-bold px-4 text-[#131313] py-4 text-center">Deadline date</TableHead>
//               <TableHead className="font-bold px-4 text-[#131313] py-4 text-right pr-12">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentJobs.map((job) => (
//               <TableRow key={job.id} className="hover:bg-transparent border-[#B6B6B6] border-b">
//                 <TableCell className="font-medium px-4 py-6">{job.title}</TableCell>
//                 <TableCell className="text-gray-500 px-4">{job.type}</TableCell>
//                 <TableCell className="text-gray-500 text-center px-4">{job.deadline}</TableCell>
//                 <TableCell className="text-right py-4 px-4">
//                   <div className="flex justify-end items-center gap-2">
//                     <Button
//                       onClick={() => handleApply(job.title)}
//                       className="bg-[#FFFF00] hover:bg-[#FFFF00] text-[#131313] h-7 px-3 rounded-full transition-colors"
//                     >
//                       Apply Now
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleView(job.id)}
//                       className="h-7 w-8 bg-[#12382B] rounded-[6px] hover:bg-[#25413c] text-white flex items-center justify-center"
//                     >
//                       <Eye size={14} />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <div className="flex items-center justify-between px-6 py-4 border-t  border-[#B6B6B6]">
//           <p className="text-xs text-gray-400">
//             Showing {startIndex + 1} to {Math.min(startIndex + jobsPerPage, jobs.length)} of {jobs.length} results
//           </p>

//           <Pagination className="w-auto mx-0">
//             <PaginationContent className="gap-1">
//               <PaginationItem>
//                 <PaginationPrevious onClick={() => goToPage(currentPage - 1)} className="h-8 w-8 p-0  border-gray-200 border rounded text-gray-400" />
//               </PaginationItem>

//               {/* Page numbers */}
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <PaginationItem key={page}>
//                   <PaginationLink
//                     onClick={() => goToPage(page)}
//                     isActive={currentPage === page}
//                     className={`h-8 w-8 border rounded ${currentPage === page
//                         ? "bg-[#C69345] text-white border-none"
//                         : "border-gray-200 text-gray-600 hover:bg-gray-100"
//                       }`}
//                   >
//                     {page}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               <PaginationItem>
//                 <PaginationNext onClick={() => goToPage(currentPage + 1)} className="h-8 w-8 p-0 border border-gray-200 rounded text-gray-600" />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import JobDetailsModal from "./JobDetailsModal";

export default function JobsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzc2ZTI5Y2Y5Zjk1MGM3ZjM1ZWRjZSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJtYWhhYnVyMTgxNDAzMUBnbWFpbC5jb20iLCJpYXQiOjE3Njk1MDc5MjAsImV4cCI6MTc3MDExMjcyMH0.4KO5RDi9REZ61c-te0haZ_Ho2HnZLSonpI32gXDkU00";

  // ================= FETCH JOBS =================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["match-jobs"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/match-job`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch jobs");

      return res.json();
    },
  });

  // ================= API DATA =================
  const apiJobs = data?.data?.data || [];

  // ================= PAGINATION =================
  const totalPages = Math.ceil(apiJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = apiJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };


  const handleView = (id: string) => {
    setSelectedJobId(id);
    setOpenModal(true);
  };

  // ================= STATES =================
  if (isLoading) return <p className="p-6">Loading jobs...</p>;

  if (isError)
    return <p className="p-6 text-red-500">Failed to load jobs</p>;

  // ================= UI =================
  return (
    <div className="p-8 bg-white border border-[#0000001A] rounded-xl mx-auto shadow-sm">
      <h2 className="text-xl mb-6">Jobs</h2>

      <div className="border border-[#B6B6B6] rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-[#B6B6B6]">
              <TableHead className="font-bold px-4 py-4">
                Job title
              </TableHead>
              <TableHead className="font-bold px-4 py-4">
                Job Type
              </TableHead>
              <TableHead className="font-bold px-4 py-4 text-center">
                Deadline date
              </TableHead>
              <TableHead className="font-bold px-4 py-4 text-right pr-12">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentJobs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-400"
                >
                  No jobs found
                </TableCell>
              </TableRow>
            )}

            {currentJobs.map((job: any) => (
              <TableRow
                key={job._id}
                className="hover:bg-transparent border-b border-[#B6B6B6]"
              >
                <TableCell className="font-medium px-4 py-6">
                  {job.title}
                </TableCell>

                <TableCell className="text-gray-500 px-4">
                  {job.level}
                </TableCell>

                <TableCell className="text-gray-500 text-center px-4">
                  {job.applicationDeadline}
                </TableCell>

                <TableCell className="text-right py-4 px-4">
                  <div className="flex justify-center items-center gap-2">
                    {/* <Button
                      onClick={() => handleApply(job.title)}
                      className="bg-[#FFFF00] hover:bg-[#FFFF00] text-[#131313] h-7 px-3 rounded-full"
                    >
                      Apply Now
                    </Button> */}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(job._id)}
                      className="h-7 w-8 bg-[#12382B] rounded-[6px] hover:bg-[#25413c] text-white"
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ============ PAGINATION ============ */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#B6B6B6]">
          <p className="text-xs text-gray-400">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + jobsPerPage, apiJobs.length)} of{" "}
            {apiJobs.length} results
          </p>

          <Pagination className="w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                />
              </PaginationItem>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => goToPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <JobDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        jobId={selectedJobId}
        token={token}
      />
    </div>
  );
}
