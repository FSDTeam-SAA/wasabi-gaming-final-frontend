'use client';

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const data = [
    { key: 1, initial: "S", name: "Sarah Johnson", email: "sarah.j@email.com", status: "Active", applications: 12, interviews: 8 },
    { key: 2, initial: "M", name: "Michael Chen", email: "michael.c@email.com", status: "Active", applications: 15, interviews: 10 },
    { key: 3, initial: "E", name: "Emma Williams", email: "emma.w@email.com", status: "Active", applications: 9, interviews: 6 },
    { key: 4, initial: "J", name: "James Brown", email: "james.b@email.com", status: "Lost active 0005", applications: 5, interviews: 2 },
    { key: 5, initial: "O", name: "Olivia Davis", email: "olivia.d@email.com", status: "Active", applications: 14, interviews: 9 },
    { key: 6, initial: "W", name: "William Garcia", email: "william.g@email.com", status: "Active", applications: 18, interviews: 12 },
];

export default function ManageStudentsTable() {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("All Status");
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;

    const filteredData = useMemo(() => {
        let result = data;

        // Status filter
        if (filterStatus !== "All Status") {
            if (filterStatus === "Active") {
                result = result.filter((item) => item.status.includes("Active"));
            } else if (filterStatus === "Lost") {
                result = result.filter((item) => item.status.includes("Lost"));
            }
        }

        // Search by name
        if (searchText.trim()) {
            const query = searchText.toLowerCase();
            result = result.filter((item) =>
                item.name.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchText, filterStatus]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage]);

    const total = filteredData.length;
    const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, total);
    const showingText =
        total === 0 ? "Showing 0 students" : `Showing ${startItem}-${endItem} of ${total} students`;

    const hasPrevious = currentPage > 1;
    const hasNext = currentPage * pageSize < total;

    const handleTrackStudent = (student: any) => {
        router.push(`/school/student/applications/${student.key}`);
    };

    const handleInviteForJob = (student: any) => {
        router.push(`/school/student/invite/${student.key}`);
    };

    return (
        <div className="flex flex-col m-2 sm:m-4 rounded-[24px] border-2 border-[#E5E5E5] bg-white overflow-hidden font-poppins">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-6 gap-4 bg-white z-10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search students..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-12 pl-12 rounded-2xl border-2 border-transparent bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-yellow-400 text-base"
                    />
                </div>
                <Select
                    value={filterStatus}
                    onValueChange={(value) => {
                        setFilterStatus(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-gray-200 font-medium">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All Status">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-[#FFFEF0]">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="font-bold text-gray-700 h-14 px-6 min-w-[200px]">Student Name</TableHead>
                            <TableHead className="font-bold text-gray-700 h-14 px-6 min-w-[220px]">Email</TableHead>
                            <TableHead className="font-bold text-gray-700 h-14 px-6 text-center min-w-[140px]">Status</TableHead>
                            <TableHead className="font-bold text-gray-700 h-14 px-6 text-center min-w-[120px]">Applications</TableHead>
                            <TableHead className="font-bold text-gray-700 h-14 px-6 text-center min-w-[110px]">Interviews</TableHead>
                            <TableHead className="font-bold text-gray-700 h-14 px-6 text-center min-w-[320px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((record) => (
                            <TableRow key={record.key} className="h-20 hover:bg-gray-50/50 transition-colors border-b-gray-100">
                                <TableCell className="px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-black border shadow-sm">
                                            {record.initial}
                                        </div>
                                        <span className="font-bold text-gray-900">{record.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 text-gray-600 font-medium">{record.email}</TableCell>
                                <TableCell className="px-6 text-center">
                                    <Badge className={cn(
                                        "px-3 py-1 font-bold",
                                        record.status.includes("Active") ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                    )}>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 text-center font-bold text-gray-700">{record.applications}</TableCell>
                                <TableCell className="px-6 text-center font-bold text-gray-700">{record.interviews}</TableCell>
                                <TableCell className="px-6">
                                    <div className="flex gap-3 justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleTrackStudent(record)}
                                            className="border-yellow-400 text-black rounded-xl h-10 px-4 font-bold hover:bg-yellow-50"
                                        >
                                            Track Student
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleInviteForJob(record)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black border-none rounded-xl h-10 px-4 font-bold"
                                        >
                                            Invite for Job
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-t border-[#E5E5E5] bg-white gap-4 mt-auto">
                <span className="text-sm font-bold text-gray-500">
                    {showingText}
                </span>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={!hasPrevious}
                        className="rounded-full px-6 font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    >
                        Previous
                    </Button>

                    <div className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black bg-yellow-400 rounded-full shadow-md">
                        {currentPage}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!hasNext}
                        className="rounded-full px-6 font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
