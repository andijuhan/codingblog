import { create } from 'zustand';

export interface ISearchStore {
   show: boolean;
   value: string;
   toggle: () => void;
   setValue: (searchValue: string) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
   show: false,
   value: '',
   toggle: () => set((state) => ({ show: !state.show })),
   setValue: (searchValue: string) => set({ value: searchValue }),
}));

export default useSearchStore;
