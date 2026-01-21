"use client";
import { Progress } from "@/components/ui/progress";
import React from "react";

const TitleProgress = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">CV Builder</h1>
        <p className="text-gray-600">
          Create a professional resume that stands out to employers.
        </p>
      </div>

      <div className="p-4 mt-5 border rounded-xl border-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">CV Completion</h1>
            <p className="text-gray-600">You're almost there! Keep going.</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">100%</h1>
          </div>
        </div>

        <div className="mt-5">
          <Progress value={33} />
        </div>
      </div>
    </div>
  );
};

export default TitleProgress;
