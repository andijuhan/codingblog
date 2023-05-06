import { create } from 'zustand';

export interface ISearchStore {
   show: boolean;
   value: any;
   toggle: () => void;
   setValue: (value: any) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
   show: false,
   value: {},
   toggle: () => set((state) => ({ show: !state.show })),
   setValue: (search: any) => set({ value: search }),
}));

export default useSearchStore;
