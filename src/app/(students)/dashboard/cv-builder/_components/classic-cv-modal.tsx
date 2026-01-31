"use client";

import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { CvBuilderFormType } from "./cv-making-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ClassicCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CvBuilderFormType | null;
}

const ClassicCvModal = ({ isOpen, onClose, cvData }: ClassicCvModalProps) => {
  const cvRef = useRef<HTMLDivElement>(null);

  if (!cvData) return null;

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;
    try {
      toast.loading("Generating PDF...");
      const canvas = await html2canvas(cvRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        210,
        (canvas.height * 210) / canvas.width,
      );
      pdf.save(`${cvData.firstName}_CV.pdf`);
      toast.dismiss();
      toast.success("Downloaded!");
    } catch (e) {
      toast.dismiss();
      toast.error("Error generating PDF");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-10">
        <div
          ref={cvRef}
          className="p-12 mx-auto text-black bg-white shadow-lg"
          style={{ width: "210mm", minHeight: "297mm", fontFamily: "serif" }}
        >
          {/* HEADER SECTION */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              {cvData.firstName} {cvData.lastName}
            </h1>
            <div className="flex justify-center gap-4 mt-1 text-sm text-blue-600 underline">
              <span>{cvData.email}</span>
              <span className="text-black no-underline">{cvData.phone}</span>
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <section className="mb-6">
            <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
              Education
            </h3>
            {cvData.educationLevel.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between ">
                  <span className="font-semibold">{edu.institution}</span>
                  <span>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <div className="italic">
                  <span>
                    {edu.educationLevel} in {edu.subject}
                  </span>
                </div>
                <p className="mt-1 text-sm">Grade: {edu.grade}</p>
              </div>
            ))}
          </section>

          {/* WORK EXPERIENCE SECTION */}
          <section className="mb-6">
            <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
              Work Experience
            </h3>
            {cvData.legalWorkExperience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between ">
                  <span className="font-semibold">{exp.organization}</span>
                  <span>
                    {exp.startYear} - {exp.endYear}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{exp.jobTitle}</span>
                </div>
                <ul className="mt-1 ml-5 space-y-1 text-sm list-disc">
                  {exp.keyResponsibilities.split("\n").map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* LEADERSHIP / OTHER SECTION */}
          {cvData.leadership.length > 0 && (
            <section className="mb-6">
              <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
                Leadership / Other Experience
              </h3>
              {cvData.leadership.map((lead, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between ">
                    <span className="font-semibold">{lead.organization}</span>
                    <span>{lead.dateYear}</span>
                  </div>
                  <div className="flex justify-between italic">
                    <span>{lead.role}</span>
                  </div>
                  <p className="mt-1 text-sm">{lead.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS & INTERESTS */}
          <section className="mb-6">
            <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
              Skills, Activities & Interests
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-bold">Technical Skills: </span>
                {cvData.achievements.skills.join(", ")}
              </p>
              <p>
                <span className="font-bold">Activities & Interests: </span>
                {cvData.summary}{" "}
                {/* Or use a specific interests field if available */}
              </p>
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3 mt-4 no-print">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownloadPDF} className="text-white bg-black">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassicCvModal;
