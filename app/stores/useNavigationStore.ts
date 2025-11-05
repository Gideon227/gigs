import { create } from 'zustand';

interface NavigationStore {
  previousUrl: string | null;
  setPreviousUrl: (url: string) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  previousUrl: null,
  setPreviousUrl: (url) => set({ previousUrl: url }),
}));
