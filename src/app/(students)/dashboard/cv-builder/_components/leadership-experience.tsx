"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { useFormState } from "./state/useFormState";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LeadershipDetails {
  leadership: {
    role: string;
    organization: string;
    dateYear: string;
    description: string | undefined;
  }[];
}

type LeadershipExperienceProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const LeadershipExperience = ({ form }: LeadershipExperienceProps) => {
  const { setIsActive, markStepCompleted } = useFormState();
  const formValue = form.watch();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzczYmZkZGQzYmYwMjNmMGJkZGE4NiIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJzaGlzaGlyLmJkY2FsbGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3Njk0MjUxNDIsImV4cCI6MTc3MDAyOTk0Mn0.O44y7SNCwAe_o-rWVVsFiyg2npWxURGXuHv5-NHxFQk";

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "leadership",
  });

  const handleNext = async () => {
    const isStepValid = await form.trigger("leadership");
    if (isStepValid) {
      setIsActive("Achievements");
      markStepCompleted("Leadership Experience");
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["leadership-details"],
    mutationFn: async (payload: LeadershipDetails) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cvbuilder/leadership`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      return await res.json();
    },

    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleLeadershipDetails = async () => {
    const validLeadershipItems = formValue.leadership.filter(
      (item) =>
        item.role.trim() && item.organization.trim() && item.dateYear.trim(),
    );

    if (validLeadershipItems.length === 0) {
      toast.warning(
        "Please fill in at least one leadership experience with all required fields",
      );
      return;
    }

    const payload = {
      leadership: formValue.leadership.map((item) => ({
        role: item.role,
        organization: item.organization,
        dateYear: item.dateYear,
        description: item.description,
      })),
    };

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error from leadership experience: ${error}`);
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <Award className="h-8" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Leadership Experience</h1>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="relative p-4 space-y-4 border border-gray-200 rounded-xl"
          >
            {/* Find Type (Role/Position) */}
            <FormField
              control={form.control}
              name={`leadership.${index}.role`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Field Type Purpose / Example Title / Name of Achievement
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senior Developer"
                      {...field}
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center w-full gap-5">
              <div className="w-full lg:w-1/2">
                {/* Organization */}
                <FormField
                  control={form.control}
                  name={`leadership.${index}.organization`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization / Issuing Body</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jan 2022"
                          {...field}
                          className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full lg:w-1/2">
                {/* Date/Year */}
                <FormField
                  control={form.control}
                  name={`leadership.${index}.dateYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date / Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Present"
                          {...field}
                          className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <FormField
                control={form.control}
                name={`leadership.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description / Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your responsibilities, achievements, and impact in this role..."
                        {...field}
                        className="min-h-[100px] rounded-2xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                onClick={handleLeadershipDetails}
                className="absolute right-3 bottom-3"
              >
                <Image
                  src={"/details-icon.png"}
                  alt="img"
                  width={1000}
                  height={1000}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="absolute -top-2 right-2"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        {/* Add Another Leadership Role */}
        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 py-2 border border-gray-400 border-dashed rounded-xl"
          onClick={() =>
            append({
              role: "",
              organization: "",
              dateYear: "",
              description: "",
            })
          }
        >
          <Plus className="w-4 h-4" /> Add Another Leadership Role
        </button>

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive("Education Level")}
            type="button"
            className="w-24 bg-gray-300 rounded-3xl hover:bg-gray-400/55"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            type="button"
            className="w-24 rounded-3xl"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadershipExperience;
