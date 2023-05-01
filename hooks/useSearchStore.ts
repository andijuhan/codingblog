import { create } from 'zustand';
import { IPosts } from '../types/contents';

export interface ISearchStore {
   show: boolean;
   value: any;
   toggle: () => void;
   setValue: (value: any) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
   show: true,
   value: {},
   toggle: () => set((state) => ({ show: !state.show })),
   setValue: (search: any) => set({ value: search }),
}));

export default useSearchStore;
