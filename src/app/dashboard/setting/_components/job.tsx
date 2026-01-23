import React from "react";
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
  PaginationEllipsis 
} from "@/components/ui/pagination";

const jobs = [
  { id: 1, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
  { id: 2, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
  { id: 3, title: "Front-End Developer", type: "Full Time", deadline: "12/10/13" },
];

export default function JobsTable() {
  const handleApply = (title: string) => {
    console.log(`Applying for: ${title}`);
  };

  const handleView = (id: number) => {
    console.log(`Viewing job ID: ${id}`);
  };

  return (
    <div className="p-8 bg-white border rounded-xl max-w-5xl mx-auto shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Jobs</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="font-bold text-black py-4">Job title</TableHead>
              <TableHead className="font-bold text-black py-4">Job Type</TableHead>
              <TableHead className="font-bold text-black py-4 text-center">Deadline date</TableHead>
              <TableHead className="font-bold text-black py-4 text-right pr-12">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-transparent border-b">
                <TableCell className="font-medium py-6">{job.title}</TableCell>
                <TableCell className="text-gray-500">{job.type}</TableCell>
                <TableCell className="text-gray-500 text-center">{job.deadline}</TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex justify-end items-center gap-2">
                    <Button 
                      onClick={() => handleApply(job.title)}
                      className="bg-[#EFFF00] hover:bg-[#d8e600] text-black text-[10px] h-7 px-3 rounded-full font-bold transition-colors"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleView(job.id)}
                      className="h-7 w-8 bg-[#1A2E2A] hover:bg-[#25413c] text-white rounded-md flex items-center justify-center"
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer / Pagination Section */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-xs text-gray-400">Showing 1 to 5 of 12 results</p>
          
          <Pagination className="w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious href="#" className="h-8 w-8 p-0 bg-gray-100 border-gray-200 rounded text-gray-400" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="h-8 w-8 bg-[#C69345] hover:bg-[#b0823d] text-white border-none rounded">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="h-8 w-8 border rounded border-gray-200 text-gray-400" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="h-8 w-8 border border-gray-200 rounded text-gray-600">
                  10
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="h-8 w-8 p-0 border border-gray-200 rounded text-gray-600" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}