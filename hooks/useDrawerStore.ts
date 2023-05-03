import { create } from 'zustand';

export interface IDrawerStore {
   show: boolean;
   toggle: () => void;
}

const useDrawerStore = create<IDrawerStore>((set) => ({
   show: true,
   toggle: () => set((state) => ({ show: !state.show })),
}));

export default useDrawerStore;
