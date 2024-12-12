import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  // State
  authUser: null,

  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // Action
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("ERROR in checkAuth: ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    try {
      const res = axiosInstance.post("/auth/signup", data);
      if (res.status === 201) {
        console.info("USER CREATED");
        set({ authUser: res.newUser });
      }
    } catch (error) {
      console.error("FAILED TO CREATED NEW USER", error.message);
      return set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  // Action
}));
