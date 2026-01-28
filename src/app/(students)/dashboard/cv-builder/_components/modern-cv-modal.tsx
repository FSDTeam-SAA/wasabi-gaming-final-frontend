"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, Printer, Mail } from "lucide-react";
import { toast } from "sonner";
import { CvBuilderFormType } from "./cv-making-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ModernCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CvBuilderFormType | null;
}

const ModernCvModal = ({ isOpen, onClose, cvData }: ModernCvModalProps) => {
  const cvRef = useRef<HTMLDivElement>(null);

  if (!cvData) return null;

  const formatDateRange = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  const handleDownloadPDF = async () => {
    if (!cvRef.current) {
      toast.error("CV content not found");
      return;
    }

    try {
      toast.loading("Generating PDF... Please wait.");

      // Capture only the CV content, not the buttons
      const cvElement = cvRef.current;

      // Store original styles
      const originalBoxShadow = cvElement.style.boxShadow;
      const originalMarginTop = cvElement.style.marginTop;

      // Temporarily adjust styles for better PDF output
      cvElement.style.boxShadow = "none";
      cvElement.style.marginTop = "0";
      cvElement.style.padding = "40px";

      // Clone the element to avoid affecting the visible version
      const clonedElement = cvElement.cloneNode(true) as HTMLElement;
      clonedElement.style.position = "fixed";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "0";
      clonedElement.style.width = "794px"; // A4 width in pixels
      clonedElement.style.backgroundColor = "white";
      document.body.appendChild(clonedElement);

      // Use html2canvas with specific options to preserve layout
      const canvas = await html2canvas(clonedElement, {
        scale: 3, // Very high resolution for crisp text
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794, // A4 width
        height: clonedElement.scrollHeight,
        windowWidth: 794,
        onclone: (clonedDoc, element) => {
          // Ensure all text is visible
          const allElements = element.querySelectorAll("*");
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.boxShadow = "none";
          });
        },
      });

      // Clean up cloned element
      document.body.removeChild(clonedElement);

      // Restore original styles
      cvElement.style.boxShadow = originalBoxShadow;
      cvElement.style.marginTop = originalMarginTop;
      cvElement.style.padding = "";

      // Calculate PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with proper margins
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 210, 297, "F");

      // Add image to PDF with proper positioning
      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, "PNG", 10, 10, 190, imgHeight * (190 / imgWidth));

      // Download PDF
      pdf.save(`${cvData.firstName}_${cvData.lastName}_CV.pdf`);

      toast.dismiss();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleShareEmail = () => {
    const subject = `CV - ${cvData.firstName} ${cvData.lastName}`;
    const body = `Please find my CV attached.\n\nName: ${cvData.firstName} ${cvData.lastName}\nEmail: ${cvData.email}\nPhone: ${cvData.phone}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        {/* CV Preview Content - Only this part goes to PDF */}
        <div
          ref={cvRef}
          className="cv-content p-8 bg-white rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] mt-5"
          style={{
            width: "850px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* Header Section */}
          <div className="pb-3 mb-4 text-center border-b-2 border-black/50">
            <h1 className="text-4xl font-bold text-gray-900">
              {cvData.firstName} {cvData.lastName}
            </h1>
            <h2 className="mt-2 text-xl text-gray-800">{cvData.profession}</h2>

            <div className="flex justify-between gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{cvData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{cvData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{cvData.location}</span>
              </div>
            </div>
          </div>

          <div>
            {/* Left Column */}
            <div className="space-y-4 lg:col-span-2">
              {/* Professional Summary */}
              <section>
                <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
                  Professional Summary
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {cvData.summary}
                </p>
              </section>

              {/* Work Experience */}
              {cvData.legalWorkExperience.length > 0 && (
                <section>
                  <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 ">
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    {cvData.legalWorkExperience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {exp.jobTitle}
                            </h4>
                            <p className="text-gray-500">{exp.organization}</p>
                          </div>
                          <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                            {formatDateRange(
                              exp.startYear,
                              exp.endYear as string,
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {exp.keyResponsibilities}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Leadership Experience */}
              {cvData.leadership.length > 0 && (
                <section>
                  <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 ">
                    Leadership Experience
                  </h3>
                  <div className="space-y-6">
                    {cvData.leadership.map((lead, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {lead.role}
                            </h4>
                            <p className="text-gray-500">{lead.organization}</p>
                          </div>
                          <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                            {lead.dateYear}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{lead.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {cvData.educationLevel.length > 0 && (
                <section>
                  <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
                    Education
                  </h3>
                  <div className="space-y-6">
                    {cvData.educationLevel.map((edu, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {edu.educationLevel}
                            </h4>
                            <p className="text-gray-500">{edu.institution}</p>
                          </div>
                          <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                            {formatDateRange(edu.startYear, edu.endYear)}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-gray-700">
                            <span className="font-medium">Subject:</span>{" "}
                            {edu.subject}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Grade:</span>{" "}
                            {edu.grade}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              <section>
                <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cvData.achievements.skills.map((skill, index) => (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-black/80"></div>
                      <span key={index} className="text-black/75">
                        {skill}
                      </span>
                    </div>
                  ))}
                  {cvData.achievements.recommendedSkills.map((skill, index) => (
                    <span
                      key={`rec-${index}`}
                      className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Action Buttons - These won't appear in PDF */}
        <div className="flex justify-end gap-3 mt-3">
          <Button
            variant="outline"
            onClick={handleShareEmail}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Share via Email
          </Button>

          <Button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-primary"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .cv-content,
            .cv-content * {
              visibility: visible;
            }
            .cv-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 20px !important;
            }
            button,
            .border-t {
              display: none !important;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

// Missing icons
const Phone = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default ModernCvModal;
