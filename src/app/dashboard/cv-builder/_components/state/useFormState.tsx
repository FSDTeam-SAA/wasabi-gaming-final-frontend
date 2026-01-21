import { create } from "zustand";

interface IFormState {
  isActive:
    | "Personal Information"
    | "Summary"
    | "Legal Work Experience"
    | "Non Legal Work Experience"
    | "Education Level"
    | "Leadership Experience"
    | "Achievements";
  setIsActive: (
    value:
      | "Personal Information"
      | "Summary"
      | "Legal Work Experience"
      | "Non Legal Work Experience"
      | "Education Level"
      | "Leadership Experience"
      | "Achievements",
  ) => void;
}

const initialState: Omit<IFormState, "setIsActive"> = {
  isActive: "Personal Information",
};

export const useFormState = create<IFormState>((set) => ({
  ...initialState,
  setIsActive: (isActive) => set({ isActive }),
}));
