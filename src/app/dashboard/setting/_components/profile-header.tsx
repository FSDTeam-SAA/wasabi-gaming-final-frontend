"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, MapPin, Mail, Phone, Calendar, Upload } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader({ data }: { data: any }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log("Selected file:", file);

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const initials = data?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Card className="p-6 border-[#FFFF00] bg-gradient-to-br from-[#FEFCE8] to-white border-2 rounded-xl relative">
            <div className="flex gap-6 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24  border-[#FFFF00] border-2 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),_0px_10px_15px_-3px_rgba(0,0,0,0.1)]  rounded-full overflow-hidden bg-[#FFFF00] flex items-center justify-center text-2xl font-bold">
                        {preview ? (
                            <Image
                                src={preview}
                                width={900}
                                height={900}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            initials || "JD"
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border border-[#FFFF00] bg-[#FFFFFF] rounded-3xl"
                        onClick={handleUploadClick}
                    >
                        <Upload className="w-4 h-4 mr-2" /> Upload Photo
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-[#1E1E1E] text-[24px] ">{data.name}</h2>
                            <p className="text-[#4A5565] text-[16px]">
                                {data.role} at {data.company}
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 text-[16px] text-[#364153] max-w-2xl">
                        {data.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" /> {data.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" /> {data.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {data.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Member since Jan 2024
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
