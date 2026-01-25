import React from "react";
import { Mail, Phone, MapPin, User, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PersonalInfoData {
    firstName?: string;
    lastName?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
}

interface PersonalInfoProps {
    data: PersonalInfoData;
    updateFormData: (section: string, data: PersonalInfoData) => void;
    onNext: () => void;
    onPreview?: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
    data,
    updateFormData,
    onNext,
    onPreview,
}) => {
    const handleChange = (field: keyof PersonalInfoData, value: string) => {
        updateFormData("personal", { ...data, [field]: value });
    };

    return (
        <div className="space-y-6 poppins">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full yellow">
                    <User className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-2xl font-semibold main-color">
                        Personal Information
                    </h2>
                    <p className="text-sm text-[#4A5565] inter">
                        Your basic contact details
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={data.firstName || ""}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={data.lastName || ""}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Professional Title"
                    value={data.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute text-gray-500 left-3 top-3 w-4 h-4" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            value={data.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="pl-10 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                        <Phone className="absolute text-gray-500 left-3 top-3 w-4 h-4" />
                        <Input
                            id="phone"
                            type="text"
                            placeholder="Phone Number"
                            value={data.phone || ""}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="pl-10 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                    <MapPin className="absolute text-gray-500 left-3 top-3 w-4 h-4" />
                    <Input
                        id="location"
                        type="text"
                        placeholder="Location"
                        value={data.location || ""}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="pl-10 focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <div /> {/* Spacer */}
                <Button
                    onClick={onNext}
                    className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e]"
                >
                    Next
                </Button>
            </div>

            {/* Show Preview Button */}
            {onPreview && (
                <div className="mt-4">
                    <Button
                        onClick={onPreview}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFF00] text-black font-medium rounded-xl hover:bg-[#ffff0e]"
                    >
                        <Eye className="w-5 h-5" />
                        Preview Resume
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;
