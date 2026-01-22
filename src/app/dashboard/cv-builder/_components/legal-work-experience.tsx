"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Gavel, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { Button } from "@/components/ui/button";
import { useFormState } from "./state/useFormState";

type PersonalInfoProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const LegalWorkExperience = ({ form }: PersonalInfoProps) => {
  const { setIsActive, markStepCompleted } = useFormState();

  const legalWorkExperienceField: (keyof CvBuilderFormType)[] = [
    "ligleJobTitle",
    "ligleOrganization",
    "ligleKeyResponsibilities",
    "ligleStartYear",
    "ligleEndYear",
  ];

  const handleNext = async () => {
    const isStepValid = await form.trigger(legalWorkExperienceField);

    if (isStepValid) {
      setIsActive("Non Legal Work Experience");
      markStepCompleted("Legal Work Experience");
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <Gavel className="h-8" />
        </div>

        <div>
          <h1 className="text-xl font-semibold">Legal Work Experience</h1>
          <p className="text-gray-600">Add your Legal work experience</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* legal JobTitle Title filed */}
        <FormField
          control={form.control}
          name="ligleJobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">
                Job Title / Role
              </FormLabel>
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="LLB in Law"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* legal Organization Title filed */}
        <FormField
          control={form.control}
          name="ligleOrganization"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">
                Organization / Firm Name
              </FormLabel>
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="University of Technology"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* legal Responsibilities Title filed */}
        <FormField
          control={form.control}
          name="ligleKeyResponsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">
                Key Responsibilities
              </FormLabel>
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="Enter your responsibilities"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* start year field */}
        <div className="flex items-center w-full gap-5">
          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="ligleStartYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    Start Year
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="2015"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="ligleEndYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    End Year / Currently Working
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="Currently working"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-x-4">
          <Button
            onClick={() => setIsActive("Personal Information")}
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

export default LegalWorkExperience;
