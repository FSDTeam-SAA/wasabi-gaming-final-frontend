"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AccountSettings() {
    const { register, handleSubmit, reset } = useForm();

    const onPasswordUpdate = (data: any) => {
        console.log("Password Update Data:", data);
        alert("Check console for logged data!");
        reset();
    };

    const handleDeleteAccount = () => {
        console.log("Action: Account Deletion Initiated");
        confirm("Are you sure you want to delete your account?");
    };

    const handleRevokeSession = (device: string) => {
        console.log(`Action: Revoking session for ${device}`);
    };

    return (
        <div className=" mx-auto space-y-6 bg-white min-h-screen">

            {/* --- Change Password Section --- */}
            <Card className="shadow-sm border-[#0000001A] rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-800">Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onPasswordUpdate)} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Current Password</Label>
                            <Input
                                {...register("currentPassword")}
                                type="password"
                                placeholder="Enter current password"
                                className="bg-[#F3F3F5] placeholder:text-slate-400 rounded-full border-none h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">New Password</Label>
                            <Input
                                {...register("newPassword")}
                                type="password"
                                placeholder="Enter new password"
                                className="bg-[#F3F3F5] placeholder:text-slate-400 rounded-full border-none h-10"

                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Confirm New Password</Label>
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="Confirm new password"
                                className="bg-[#F3F3F5] placeholder:text-slate-400 rounded-full border-none h-10"

                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#FFFF00] rounded-full text-black hover:bg-[#d8e600] font-normal mt-2"
                        >
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* --- Active Sessions Section --- */}
            <Card className="shadow-sm border-[#0000001A] rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-lg mb-5 font-medium text-gray-800">Active Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Current Session */}
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB]  rounded-3xl">
                        <div className="space-y-3">
                            <p className="font-medium text-sm">Current Session</p>
                            <p className="text-xs text-gray-500">San Francisco, CA • Chrome on Mac</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-normal">
                            Active
                        </Badge>
                    </div>

                    {/* Mobile Device */}
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB]  rounded-3xl">
                        <div className="space-y-3">
                            <p className="font-medium text-sm">Mobile Device</p>
                            <p className="text-xs text-gray-500">Last active 2 days ago</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white border-[#0000001A] rounded-full border text-xs"
                            onClick={() => handleRevokeSession("Mobile Device")}
                        >
                            Revoke
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* --- Danger Zone Section --- */}
            <Card className="shadow-sm border-[#FFC9C9] bg-[#FEF2F2] border-2 rounded-3xl">
                <CardContent className="pt-6">
                    <h3 className="text-red-500 font-bold mb-4">Danger Zone</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Delete Account</p>
                            <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                        </div>
                        <Button
                            variant="destructive"
                            className="bg-[#D4183D] text-white rounded-full hover:bg-[#D4183D]/50"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* --- Footer --- */}
            <footer className="text-center pt-8 pb-4 space-y-2">
                <p className="text-xs text-gray-400">© 2025 Aspiring — Your Path to Professional Growth</p>
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Contact Support</a>
                </div>
            </footer>
        </div>
    );
}