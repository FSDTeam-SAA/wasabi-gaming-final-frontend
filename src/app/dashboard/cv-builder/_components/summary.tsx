"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FileText, CheckCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { Button } from "@/components/ui/button";
import { useFormState } from "./state/useFormState";

type SummaryProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const Summary = ({ form }: SummaryProps) => {
  const { setIsActive } = useFormState();

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <FileText className="h-8" />
        </div>

        <div>
          <h1 className="text-xl font-semibold">Professional Summary</h1>
          <p className="text-gray-600">Brief overview of your career</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary field */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">Summary</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[200px] rounded-2xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5] resize-none"
                  placeholder="Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and leading high-performing teams.'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Tip: Keep it concise (3-4 sentences) and highlight your most
            impressive achievements
          </p>

          {/* Character count (optional) */}
          <div className="text-sm text-right text-gray-500">
            {form.watch("summary")?.length || 0} characters
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive("Achievements")}
            type="button"
            className="w-24 bg-gray-300 rounded-3xl hover:bg-gray-400/55"
          >
            Previous
          </Button>
          <Button type="button" className="w-24 rounded-3xl">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
