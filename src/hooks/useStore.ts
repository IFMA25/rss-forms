import { create } from 'zustand';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: 'male' | 'female';
  acceptTnC: boolean;
  picture: string | null;
  country: string;
}

interface FormStore {
  allFormData: FormData[];
  addFormData: (data: FormData) => void;
  resetFormFields: () => void;
  countries: string[];
  setCountries: (countries: string[]) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  allFormData: [],
  addFormData: (data) =>
    set((state) => ({ allFormData: [...state.allFormData, data] })),
  resetFormFields: () =>
    set((state) => ({
      allFormData: state.allFormData,
    })),
  countries: [],
  setCountries: (countries) => set({ countries }),
}));
