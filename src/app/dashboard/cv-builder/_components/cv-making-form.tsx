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
    },
  });

  function onSubmit(data: CvBuilderFormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
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
              {isActive === "Summary" && <div>Summary Component</div>}
              {isActive === "Non Legal Work Experience" && (
                <div>Non Legal Work Experience Component</div>
              )}
              {isActive === "Education Level" && (
                <div>Education Level Component</div>
              )}
              {isActive === "Leadership Experience" && (
                <div>Leadership Experience Component</div>
              )}
              {isActive === "Achievements" && <div>Achievements Component</div>}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CvMakingForm;
