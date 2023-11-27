import { create } from "zustand";

export const useStoreUser = create((set) => ({
  user: { username: "invitado", role: "invitado" },
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
}));
