"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountSettings() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PasswordForm>();

  // ⚠️ Replace this with real auth (NextAuth / cookies)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzA1Y2I1NzI0OTlhOWZiOWFiNjg1YSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGdtYWlsLmNvbSIsImlhdCI6MTc2OTI1MDQ4OSwiZXhwIjoxNzY5ODU1Mjg5fQ.n_EkQqC2vZ_jJwl4uDag7uSUIZo_1WWVdssMvOdkJPI";

  const changePassword = useMutation({
    mutationFn: async (payload: {
      oldPassword: string;
      newPassword: string;
    }) => {
      if (!token) throw new Error("Authentication token missing");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      return data;
    },

    onSuccess: () => {
      toast.success("Password changed successfully");
      reset();
    },

    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const onPasswordUpdate = (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    changePassword.mutate({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };


  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      console.log("Account deletion confirmed");
    }
  };

  const handleRevokeSession = (device: string) => {
    console.log(`Revoking session for ${device}`);
  };

  return (
    <div className="mx-auto space-y-6 bg-white min-h-screen">

      {/* Change Password */}
      <Card className="shadow-sm border-[#0000001A] rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onPasswordUpdate)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">
                Current Password
              </Label>
              <Input
                {...register("currentPassword", { required: true })}
                type="password"
                placeholder="Enter current password"
                className="bg-[#F3F3F5] rounded-full border-none h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-600">
                New Password
              </Label>
              <Input
                {...register("newPassword", { required: true })}
                type="password"
                placeholder="Enter new password"
                className="bg-[#F3F3F5] rounded-full border-none h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-600">
                Confirm New Password
              </Label>
              <Input
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirm new password"
                className="bg-[#F3F3F5] rounded-full border-none h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={changePassword.isPending}
              className="bg-[#FFFF00] rounded-full text-black hover:bg-[#d8e600] font-normal mt-2 disabled:opacity-60"
            >
              {changePassword.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="shadow-sm border-[#0000001A] rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Active Sessions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-3xl">
            <div>
              <p className="font-medium text-sm">Current Session</p>
              <p className="text-xs text-gray-500">
                San Francisco, CA • Chrome on Mac
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-none font-normal">
              Active
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-3xl">
            <div>
              <p className="font-medium text-sm">Mobile Device</p>
              <p className="text-xs text-gray-500">
                Last active 2 days ago
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => handleRevokeSession("Mobile Device")}
            >
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="shadow-sm border-[#FFC9C9] bg-[#FEF2F2] border-2 rounded-3xl">
        <CardContent className="pt-6">
          <h3 className="text-red-500 font-bold mb-4">
            Danger Zone
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                Delete Account
              </p>
              <p className="text-xs text-gray-500">
                Permanently delete your account and all data
              </p>
            </div>
            <Button
              variant="destructive"
              className="rounded-full bg-[#D4183D] text-white"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center pt-8 pb-4 space-y-2">
        <p className="text-xs text-gray-400">
          © 2025 Aspiring — Your Path to Professional Growth
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
