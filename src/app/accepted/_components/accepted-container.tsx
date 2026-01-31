'use client';

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

/* ------------------ Schema ------------------ */
const acceptedSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
});

type AcceptedFormValues = z.infer<typeof acceptedSchema>;

const AcceptedContainerPage = () => {
  const session = useSession();
  const token = session?.data?.accessToken;

  const form = useForm<AcceptedFormValues>({
    resolver: zodResolver(acceptedSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  /* ------------------ API Mutation ------------------ */
  const { mutate, isPending } = useMutation({
    mutationKey: ["accepted-student"],
    mutationFn: async (values: AcceptedFormValues) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accepted-student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Accepted successfully");
      form.reset();
    },
  });

  const onSubmit = (values: AcceptedFormValues) => {
    mutate(values);
  };

  return (
    <Card className="p-8 bg-[#FFFEF0] border-[2px] border-[#E5E5E5] rounded-[24px] max-w-2xl mx-auto">
      <h3 className="flex items-center gap-3 text-xl md:text-2xl font-normal text-[#1E1E1E] mb-6">
        <span className="bg-[#FFFF00] rounded-2xl p-3 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-black" />
        </span>
        Accepted Student Details
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter full name"
                    className="h-12 bg-[#FAFAFA] rounded-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="student@email.com"
                    className="h-12 bg-[#FAFAFA] rounded-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Phone Number *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+880 1XXXXXXXXX"
                    className="h-12 bg-[#FAFAFA] rounded-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="pt-6">
            <Button
              disabled={isPending}
              className="w-full h-[48px] text-lg font-semibold"
              type="submit"
            >
              {isPending ? "Submitting..." : "Confirm Acceptance"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default AcceptedContainerPage;
