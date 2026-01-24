"use client";
import React from "react";
import ChooseCvStyle from "./choose-cv-style";
import Sections from "./sections";
import PersonalInfo from "./personal-info";
import { useFormState } from "./state/useFormState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { cvBuilderSchema } from "@/schema/cvBuilderSchema";
import LegalWorkExperience from "./legal-work-experience";
import NonLegalWorkExperience from "./non-legal-work-experience";
import EducationLevel from "./education-level";
import LeadershipExperience from "./leadership-experience";
import Achievements from "./achievements";
import Summary from "./summary";
import TitleProgress from "./title-progress";

export type CvBuilderFormType = z.infer<typeof cvBuilderSchema>;

const CvMakingForm = () => {
  const { isActive } = useFormState();

  const form = useForm<CvBuilderFormType>({
    resolver: zodResolver(cvBuilderSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
      legalWorkExperience: [
        {
          jobTitle: "",
          organization: "",
          keyResponsibilities: "",
          startYear: "",
          endYear: "",
        },
      ],
      nonLegalWorkExperienceSchema: [
        {
          jobTitle: "",
          organization: "",
          keyResponsibilities: "",
          startYear: "",
          endYear: "",
        },
      ],
      educationLevel: [
        {
          subject: "",
          institution: "",
          educationLevel: "",
          startYear: "",
          endYear: "",
          grade: "",
        },
      ],
      leadership: [
        {
          dateYear: "",
          description: "",
          findType: "",
          organization: "",
        },
      ],
      achievements: {
        skills: [],
        recommendedSkills: [],
      },
      summary: "",
      cvformet: "",
    },
  });

  function onSubmit(data: CvBuilderFormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <TitleProgress form={form}  />
          <ChooseCvStyle />

          <div className="flex items-start gap-5">
            <div className="lg:w-[30%]">
              <Sections />
            </div>

            <div className="flex flex-1">
              {isActive === "Personal Information" && (
                <PersonalInfo form={form} />
              )}
              {isActive === "Legal Work Experience" && (
                <LegalWorkExperience form={form} />
              )}
              {isActive === "Non Legal Work Experience" && (
                <NonLegalWorkExperience form={form} />
              )}
              {isActive === "Education Level" && <EducationLevel form={form} />}
              {isActive === "Leadership Experience" && (
                <LeadershipExperience form={form} />
              )}
              {isActive === "Achievements" && <Achievements form={form} />}
              {isActive === "Summary" && <Summary form={form} />}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CvMakingForm;
