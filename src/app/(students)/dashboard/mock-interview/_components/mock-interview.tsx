import { Button } from "@/components/ui/button";
import { Clock4, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const MockInterview = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="p-4 border-2 border-gray-300/50 rounded-xl">
        <div className="flex items-center gap-4">
          <Image
            src={"/mock-interview/behavioural_interview.png"}
            alt="img.png"
            width={1000}
            height={1000}
            className="object-cover w-12 h-12"
          />

          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Behavioural Interview</h1>
              <button>status</button>
            </div>
            <p className="mt-1 text-sm text-gray-700">
              Practise reflecting on real experiences and demonstrate skills
              like teamwork, adaptability, and leadership.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h4 className="flex items-center gap-2 text-sm text-gray-500">
              <Clock4 className="w-4 h-4" /> time
            </h4>
          </div>

          <div className="mt-2">
            <Button className="flex items-center w-full gap-3 text-lg font-semibold rounded-xl">
              <span>
                <Play className="w-4 h-4" />
              </span>{" "}
              <span>Start Test</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
