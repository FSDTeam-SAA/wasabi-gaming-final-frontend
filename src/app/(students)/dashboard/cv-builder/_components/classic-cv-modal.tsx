"use client";

import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";
import { toast } from "sonner";
import { CvBuilderFormType } from "./cv-making-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ClassicCvProps {
  isOpen: boolean;
  onClose: () => void;
  classicCvData: CvBuilderFormType | null;
}

const ClassicCvModal = ({ isOpen, onClose, classicCvData }: ClassicCvProps) => {
  const cvRef = useRef<HTMLDivElement>(null);

  if (!classicCvData) return null;

  const handleDownloadPDF = async () => {
    if (!cvRef.current) {
      toast.error("CV content not found");
      return;
    }
    try {
      toast.loading("Generating PDF...");
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${classicCvData.firstName}_CV.pdf`);
      toast.dismiss();
      toast.success("Downloaded!");
    } catch (e) {
      toast.dismiss();
      toast.error("Download failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-0 border-none">
        <div className="flex flex-col items-center p-8">
          {/* CV PAPER */}
          <div
            ref={cvRef}
            className="bg-white text-[#4a4a4a] shadow-2xl"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "0",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Header Section */}
            <div className="px-12 pt-16 pb-8">
              <div className="flex flex-col items-end pt-8 border-t-4 border-zinc-200">
                <h1 className="text-5xl font-light tracking-widest uppercase text-zinc-800">
                  {classicCvData.firstName}{" "}
                  <span className="font-bold">{classicCvData.lastName}</span>
                </h1>
                <p className="text-xl tracking-[0.2em] text-zinc-500 mt-2">
                  {classicCvData.profession || "Marketing Manager"}
                </p>
              </div>
            </div>

            {/* Dark Contact Bar */}
            <div className="bg-[#666666] text-white py-3 px-12 flex justify-between text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin size={12} />{" "}
                {classicCvData.location || "123 Anywhere St., Any City"}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} /> www.reallygreatsite.com
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} /> {classicCvData.email}
              </div>
            </div>

            <div className="px-12 pt-8">
              <section className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                    Profile Info
                  </h3>
                  <div className="h-[1px] bg-zinc-300 w-full"></div>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600">
                  {classicCvData.summary}
                </p>
              </section>
            </div>

            <div className="grid grid-cols-12 gap-0">
              {/* MAIN COLUMN (Left) */}
              <div className="col-span-7 p-12 pr-8">
                {/* Profile Info */}

                {/* Experience */}
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Experience
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full"></div>
                  </div>

                  <div className="relative pl-6 ml-2 space-y-8 border-l border-zinc-300">
                    {classicCvData.legalWorkExperience.map((exp, i) => (
                      <div key={i} className="relative">
                        {/* Bullet Point */}
                        <div className="absolute -left-[31px] top-1 w-2 h-2 bg-zinc-500 border border-white"></div>

                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                          {exp.startYear} - {exp.endYear || "Present"}
                        </span>
                        <div className="mb-1 text-xs font-bold text-zinc-500">
                          {exp.organization}
                        </div>
                        <h4 className="mb-2 font-bold text-zinc-800">
                          {exp.jobTitle}
                        </h4>
                        <ul className="text-[11px] text-zinc-600 list-disc list-outside ml-3 space-y-1">
                          <li>{exp.keyResponsibilities}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SIDEBAR (Right) */}
              <div className="min-h-full col-span-5 p-12 pl-8 bg-zinc-50">
                {/* Education */}
                <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Education
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full"></div>
                  </div>
                  <div className="space-y-6">
                    {classicCvData.educationLevel.map((edu, i) => (
                      <div key={i}>
                        <div className="text-[10px] font-bold text-zinc-400 mb-1">
                          {edu.startYear} - {edu.endYear} | {edu.institution}
                        </div>
                        <div className="text-xs font-bold text-zinc-700">
                          {edu.educationLevel}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          {edu.subject}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Skills
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full"></div>
                  </div>
                  <ul className="text-[11px] text-zinc-600 space-y-2">
                    {classicCvData.achievements.skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-800"></span>{" "}
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Languages
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full"></div>
                  </div>
                  <ul className="text-[11px] text-zinc-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-800"></span>{" "}
                      English
                    </li>
                    <li className="flex items-center gap-2 text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-zinc-400"></span>{" "}
                      Spanish (Basic)
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Floating Actions */}
          <div className="flex justify-end w-full gap-3 mt-8">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-primary"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassicCvModal;
