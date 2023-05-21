import { create } from 'zustand';

export interface IDrawerStore {
   show: boolean;
   toggle: () => void;
   hide: () => void;
}

const useDrawerStore = create<IDrawerStore>((set) => ({
   show: false,
   toggle: () => set((state) => ({ show: !state.show })),
   hide: () => set(() => ({ show: false })),
}));

export default useDrawerStore;
