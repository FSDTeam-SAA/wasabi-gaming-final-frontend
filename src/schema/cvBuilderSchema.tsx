import { z } from "zod";

export const educationSchema = z.object({
  educationLevel: z.string().min(1, "Education level is required"),
  institution: z.string().min(1, "Institution is required"),
  grade: z.string().optional(),
  subject: z.string().optional(),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().min(1, "End year is required"),
});

export const leadershipSchema = z.object({
  findType: z.string().min(1, "Find type is required"),
  organization: z.string().min(1, "Organization is required"),
  dateYear: z.string().min(1, "Date year is required"),
  description: z.string().optional(),
});

export const achievementSchema = z.object({
  skills: z.array(z.string()).default([]),
  recommendedSkills: z.array(z.string()).default([]),
});

export const cvBuilderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profession: z.string({ required_error: "Profession is required" }).min(1, "Profession is required"),
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),

  ligleJobTitle: z.string().optional(),
  ligleOrganization: z.string().optional(),
  ligleKeyResponsibilities: z.string().optional(),
  ligleStartYear: z.string().optional(),
  ligleEndYear: z.string().optional(),
  ligleEducation: z.string().optional(),

  notLigleJobTitle: z.string().optional(),
  notLigleOrganization: z.string().optional(),
  notLigleKeyResponsibilities: z.string().optional(),
  notLigleStartYear: z.string().optional(),
  notLigleEndYear: z.string().optional(),
  notLigleEducation: z.string().optional(),

  educationLevel: z.array(educationSchema).default([]),
  leadership: z.array(leadershipSchema).default([]),

  achievements: achievementSchema.default({
    skills: [],
    recommendedSkills: [],
  }),

  summary: z.string().optional(),

  createBy: z.string().min(1, "User ID is required"),
  cvformet: z.string().optional(),
});
