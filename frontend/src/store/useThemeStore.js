import { create } from "zustand";

export const useThemeStore = create((set) => ({
  // state
  theme: localStorage.getItem("chat-theme") || "coffee",
  //action
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme: theme });
  },
}));
