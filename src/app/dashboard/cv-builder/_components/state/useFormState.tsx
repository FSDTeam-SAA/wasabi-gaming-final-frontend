import { create } from "zustand";

interface IFormState {
  isActive: string;
  setIsActive: (value: string) => void;
}

const initialState: Omit<IFormState, "setIsActive"> = {
  isActive: "Personal Information",
};

export const useFormState = create<IFormState>((set) => ({
  ...initialState,
  setIsActive: (isActive) => set({ isActive }),
}));
