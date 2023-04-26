import { create } from 'zustand';

export interface IDrawerStore {
   show: boolean;
   toggle: () => void;
}

const useDrawerStore = create<IDrawerStore>((set) => ({
   show: false,
   toggle: () => set((state) => ({ show: !state.show })),
}));

export default useDrawerStore;
