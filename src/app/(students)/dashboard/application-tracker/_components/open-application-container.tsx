"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  OpenJob,
  OpenApplicationApiResponse,
} from "./open-application-data-type";
import { Search, Calendar, DollarSign, Eye, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";
import moment from "moment";
import { Input } from "@/components/ui/input";

import { useDebounce } from "@/hooks/useDebounce";
import WasabiDropDown from "@/components/ui/WasabiDropdown";
import YourCareerInsights from "./your-career-insights";
import ReadyToNextStep from "./ready-to-next-step";
import CloseJobViewDetailsModal from "./CloseJobViewDetailsModal";

const jobTypeList = [
  { id: 1, name: "Apprenticeship", value: "Apprenticeship" },
  { id: 2, name: "Work Experience", value: "Work Experience" },
  { id: 3, name: "Training Contracts", value: "Training Contracts" },
  { id: 4, name: "Paralegal", value: "Paralegal" },
];

const locationList = [
  { id: 1, name: "London", value: "London" },
  { id: 2, name: "Manchester", value: "Manchester" },
  { id: 3, name: "Birmingham", value: "Birmingham" },
  { id: 4, name: "Leeds", value: "Leeds" },
  { id: 5, name: "Liverpool", value: "Liverpool" },
  { id: 6, name: "Cardiff", value: "Cardiff" },
];

const isJobClosed = (deadline: string) => {
  if (!deadline) return true;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

const canApplyToJob = (job: OpenJob) => {
  return job.status === "active" && !isJobClosed(job.applicationDeadline);
};

const ALL = "__all__";

const OpenApplicationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [jobType, setJobType] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [activeFilter, setActiveFilter] = useState<
    "search" | "jobType" | "location" | null
  >(null);
  const [filterSource, setFilterSource] = useState<"hero" | "container" | null>(null);

  const session = useSession();
  const token = session?.data?.accessToken;
  console.log(token);
  const status = "Open";
  console.log(search);

  useEffect(() => {
    const storedFilters = localStorage.getItem("jobFilters");

    if (storedFilters) {
      const parsed = JSON.parse(storedFilters);

      if (parsed.jobType) setJobType(parsed.jobType);
      if (parsed.location) setLocation(parsed.location);

      setFilterSource(parsed.source);

      localStorage.removeItem("jobFilters");
    }
  }, []);



  const buildSearchTerm = () => {

    if (activeFilter === "search") return debouncedSearch;
    if (activeFilter === "jobType") return jobType;
    if (activeFilter === "location") return location;

    return "";
  };




  const { data, isLoading, isError, error } =
    useQuery<OpenApplicationApiResponse>({
      queryKey: [
        "open-application",
        currentPage,
        status,
        activeFilter,
        debouncedSearch,
        jobType,
        location,
      ],


      queryFn: async () => {
        const params = new URLSearchParams({
          jobStatus: status,
          page: String(currentPage),
          limit: "10",
        });

        // ✅ CASE 1: Hero থেকে আসলে
        if (filterSource === "hero") {
          if (jobType) params.append("title", jobType);
          if (location) params.append("location", location);
        }

        // ✅ CASE 2: Container থেকে filter হলে
        else {
          const searchTerm = buildSearchTerm();
          if (searchTerm) {
            params.append("searchTerm", searchTerm);
          }
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.json();
      }


      // queryFn: async () => {
      //   const searchTerm = buildSearchTerm();

      //   const params = new URLSearchParams({
      //     jobStatus: status,
      //     page: String(currentPage),
      //     limit: "10",
      //   });

      //   if (searchTerm) {
      //     params.append("searchTerm", searchTerm);
      //   }
      //   const res = await fetch(
      //     // `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?jobStatus=${status}&searchTerm=${location}&page=${currentPage}&limit=10`,
      //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?${params.toString()}&location=${location}&title=${jobType}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     },
      //   );

      //   return res.json();
      // },



    });

  console.log(data);

  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / data.meta.limit)
    : 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const applideMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/applied-job/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to apply");
      }

      return result;
    },

    onSuccess: (response) => {
      const redirectUrl = response?.data?.job?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },

    onError: (error: any) => {
      console.error("Apply failed:", error.message);
    },
  });


  const handleApply = (jobId: string) => {
    applideMutation.mutate(jobId);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-3 pb-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-semibold leading-[120%] text-[#131313]">
          Filter Jobs
        </h2>
        <p className="text-base font-normal text-[#424242] leading-[150%]">
          {data?.data?.length || 0} + Results
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* search  */}
        <div>
          <Input
            type="search"
            className="w-full  md:w-[300px] h-[36px] px-3  rounded-xl bg-[#E9EEF2] placeholder:text-[#929292] border border-[#616161]"
            //             />
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveFilter("search");
            }}

            placeholder="Search"
          />
        </div>

        {/* job type  */}
        <div>
          <WasabiDropDown
            list={jobTypeList}
            selectedValue={jobType}
            // onValueChange={setJobType}
            onValueChange={(value) => {
              setJobType(value);
              setActiveFilter("jobType");
            }}

            placeholderText="Job Type"
          />
        </div>
        {/* job type  */}
        <div>
          <WasabiDropDown
            list={locationList}
            selectedValue={location}
            // onValueChange={setLocation}
            onValueChange={(value) => {
              setLocation(value);
              setActiveFilter("location");
            }}

            placeholderText="Location"
          />
        </div>
      </div>

      <h4 className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#1E1E1E] leading-[32px] pt-6 md:pt-7 lg:pt-8 pb-6">
        Your Applications
      </h4>

      {/* Job Cards */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          No matching opportunities found.
          <p className="text-base mt-3">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((app) => (
              <div
                key={app._id}
                className="border-[2px] border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full"
              // onClick={() => {
              //   setSelectedJob(app);
              //   setIsJobModalOpen(true);
              // }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-[#4A5565]" />
                  </div>
                  <button
                    className={`h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]`}
                  >
                    {app?.jobStatus}
                  </button>
                </div>

                <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">
                  {app.title}
                </h3>
                <p className="text-[#4A5565] text-sm font-normal mb-4">
                  {app.companyName}
                </p>

                <div className="border-b border-[#F3F4F6]">
                  <div className="flex items-center gap-3 pb-4">
                    <Calendar className="w-4 h-4 text-[#6A7282]" />
                    <span className="text-[#6A7282] text-sm leading-[20px] font-normal">
                      {moment(app?.applicationDeadline).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <div className="">
                    {app?.notes && (
                      <span className="h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] p-3">
                        {app?.notes}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                  {/* <Button
                    variant="outline"
                    className="w-full h-[32px] flex items-center gap-2 bg-transparent border border-[#E5E500]  py-2 font-medium text-[#1E1E1E] leading-[20px] hover:bg-[#FFFF00]/90 rounded-[14px]"
                  >
                    <Eye className="w-4 h-4 text-[#1E1E1E]" /> View Details
                  </Button> */}
                  <CloseJobViewDetailsModal id = {app?._id}/>

                  <Button
                    onClick={() => handleApply(app._id)}
                    className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium"
                  >
                    {applideMutation.isPending ? "Applying..." : "Apply Now"}
                  </Button>

                  {/* {canApplyToJob(app) && (
                      <Link href="/dashboard/application-tracker/cv-uplode">
                        <Button className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium">
                          Apply Now
                        </Button>
                      </Link>
                    )} */}
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                ),
              )}

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
            Showing {data?.data?.length} of 10 opportunities{" "}
            {`(Page ${currentPage} of ${totalPages})`}
          </div>
        </>
      )}

      {/* YourCareerInsights section  */}
      <section className="py-8">
        <YourCareerInsights />
      </section>

      {/* Ready to Take the Next Step? section  */}

      <section>
        <ReadyToNextStep />
      </section>
    </div>
  );
};

export default OpenApplicationContainer;



// "use client"

// import { useQuery } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
// import React, { useState, useMemo, useEffect } from "react";
// import { OpenJob, OpenApplicationApiResponse } from './open-application-data-type';
// import { Search, Calendar, Eye, Building2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/utils/cn';
// import moment from "moment";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import YourCareerInsights from './your-career-insights';
// import ReadyToNextStep from './ready-to-next-step';

// const ALL = "__all__";

// const OpenApplicationContainer = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const session = useSession();
//   const token = session?.data?.accessToken;
//   const status = "active";

//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState<string>(ALL);
//   const [jobTypeFilter, setJobTypeFilter] = useState<string>(ALL);
//   const [searchTrigger, setSearchTrigger] = useState(0);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setSearchTrigger((prev) => prev + 1);
//     }
//   }, [searchQuery]);

//   const { data, isLoading } = useQuery<OpenApplicationApiResponse>({
//     queryKey: ["open-application", currentPage, status],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?status=${status}&page=${currentPage}&limit=10`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return res.json();
//     },
//   });

//   const totalPages = data?.meta ? Math.ceil(data.meta.total / data.meta.limit) : 0;

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     setSearchTrigger((prev) => prev + 1);
//   };

//   // Unique locations from API
//   const uniqueLocations = useMemo(() => {
//     if (!data?.data) return [];
//     const locationSet = new Set<string>();
//     data.data.forEach((job) => {
//       if (job.location && job.location.trim()) locationSet.add(job.location.trim());
//     });
//     return Array.from(locationSet).sort((a, b) => a.localeCompare(b));
//   }, [data]);

//   // Filtered jobs based on search, location, and job type
//   const filteredJobs = useMemo(() => {
//     if (!data?.data) return [];

//     return data.data.filter((job) => {
//       // Search filter (title, company, location)
//       const query = searchQuery.toLowerCase();
//       const matchesSearch =
//         job.title.toLowerCase().includes(query) ||
//         job.companyName.toLowerCase().includes(query) ||
//         (job.location && job.location.toLowerCase().includes(query));

//       // Location filter
//       const matchesLocation = locationFilter === ALL || job.location === locationFilter;

//       // Job type filter
//       const matchesJobType = jobTypeFilter === ALL || job.companyType === jobTypeFilter;

//       return matchesSearch && matchesLocation && matchesJobType;
//     });
//   }, [data, searchQuery, locationFilter, jobTypeFilter, searchTrigger]);

//   return (
//     <div>

//       <div className="w-full flex items-center justify-between gap-3 pb-5">
//         <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-semibold leading-[120%] text-[#131313]">Filter Jobs</h2>
//       <p className="text-base font-normal text-[#424242] leading-[150%]">15,00 + Results</p>
//       </div>
//       {/* Filters */}
//       <div className="w-full md:w-1/2 mb-12">
//         <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 flex-wrap">
//           {/* Search */}
//           <div className="h-[38px] flex-1 min-w-[280px] relative bg-[#E9EEF2] border border-[#616161] rounded-[8px]">
//             {/* <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" /> */}
//             <Input
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSearch())}
//               className="h-[36px] px-3  rounded-xl bg-[#E9EEF2] placeholder:text-[#929292] border border-gray-300"
//             />
//             <Button
//               type="submit"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2  bg-transparent text-[#929292]  rounded-full w-9 h-9 shadow-sm"
//               disabled={isLoading}
//             >
//               <Search className="w-5 h-5" />
//             </Button>
//           </div>

//           {/* Job Type Dropdown */}
//           <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
//             <SelectTrigger className="h-[40px] w-full sm:w-[150px] rounded-xl border border-gray-300 bg-[#E9EEF2]">
//               <SelectValue placeholder="Job Type" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl">
//               <SelectItem value={ALL}>All Job Types</SelectItem>
//               <SelectItem value="solicitor">Solicitor Apprenticeships</SelectItem>
//               <SelectItem value="paralegal">Paralegal Apprenticeships</SelectItem>
//               <SelectItem value="year_12_work_experience">Year 12 Work Experience</SelectItem>
//               <SelectItem value="year_13_work_experience">Year 13 Work Experience</SelectItem>
//               <SelectItem value="training_contracts">Training Contracts</SelectItem>
//               <SelectItem value="vacation_schemes">Vacation Schemes</SelectItem>
//               <SelectItem value="insight_days">Insight Days</SelectItem>
//               <SelectItem value="open_days">Open Days</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Location Dropdown */}
//           <Select value={locationFilter} onValueChange={setLocationFilter}>
//             <SelectTrigger className="h-[40px] w-full sm:w-[150px] rounded-xl border border-gray-300 bg-[#E9EEF2]">
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl max-h-[320px]">
//               <SelectItem value={ALL}>All Locations</SelectItem>
//               {uniqueLocations.map((loc) => (
//                 <SelectItem key={loc} value={loc}>
//                   {loc}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//         </form>
//       </div>

//       {/* Job Cards */}
//       {filteredJobs.length === 0 ? (
//         <div className="text-center py-20 text-gray-500 text-xl">
//           No matching opportunities found.
//           <p className="text-base mt-3">Try adjusting your search or filters.</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="border-[2px] border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full"
//               >
//                 <div className="flex justify-between items-start mb-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
//                     <Building2 className="w-7 h-7 text-[#4A5565]" />
//                   </div>
//                   <button className="h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]">
//                     {job.jobStatus}
//                   </button>
//                 </div>

//                 <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">{job.title}</h3>
//                 <p className="text-[#4A5565] text-sm font-normal mb-4">{job.companyName}</p>

//                 <div className="border-b border-[#F3F4F6] pb-4">
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-4 h-4 text-[#6A7282]" />
//                     <span className="text-[#6A7282] text-sm leading-[20px] font-normal">{moment(job?.applicationDeadline).format("MMM DD, YYYY")}</span>
//                   </div>
//                   {job?.notes && (
//                     <span className="h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] p-3 mt-2 block">
//                       {job.notes}
//                     </span>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
//                   <Button variant="outline" className="w-full h-[32px] flex items-center gap-2 bg-transparent border border-[#E5E500] font-medium text-[#1E1E1E] leading-[20px] hover:bg-[#FFFF00]/90 rounded-[14px]">
//                     <Eye className="w-4 h-4 text-[#1E1E1E]" /> View Details
//                   </Button>

//                   <Button className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium">
//                     Apply Now
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-12 flex justify-center items-center gap-3 flex-wrap">
//               <Button
//                 variant="outline"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="border-gray-300"
//               >
//                 Previous
//               </Button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <Button
//                   key={page}
//                   variant={currentPage === page ? "default" : "outline"}
//                   onClick={() => handlePageChange(page)}
//                   className={cn(
//                     "min-w-[40px]",
//                     currentPage === page
//                       ? "bg-[#FFFF00] hover:bg-[#FFFF00] text-black border-none"
//                       : "border-gray-300"
//                   )}
//                 >
//                   {page}
//                 </Button>
//               ))}

//               <Button
//                 variant="outline"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="border-gray-300"
//               >
//                 Next
//               </Button>
//             </div>
//           )}

//           <div className="text-center text-gray-600 mt-6">
//             Showing {filteredJobs.length} of 10 opportunities{" "}
//             {`(Page ${currentPage} of ${totalPages})`}
//           </div>
//         </>
//       )}

//       {/* YourCareerInsights section  */}
//       <section className='py-8'>
//         <YourCareerInsights/>
//       </section>

//       {/* Ready to Take the Next Step? section  */}

//       <section >
//         <ReadyToNextStep/>
//       </section>
//     </div>
//   );
// };

// export default OpenApplicationContainer;
