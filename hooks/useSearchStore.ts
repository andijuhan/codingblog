import { create } from 'zustand';
import { IPosts } from '../types/contents';

export interface ISearchStore {
   show: boolean;
   value: any;
   loading: boolean;
   toggle: () => void;
   setValue: (value: any) => void;
   setLoading: (value: boolean) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
   show: false,
   value: {},
   loading: false,
   toggle: () => set((state) => ({ show: !state.show })),
   setValue: (search: any) => set({ value: search }),
   setLoading: (isLoading: boolean) => set({ loading: isLoading }),
}));

export default useSearchStore;
