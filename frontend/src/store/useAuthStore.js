import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      if (res.status === 201) {
        toast.success("Account created successfully");
        console.info("USER CREATED");
        set({ authUser: res.data.newUser });
      }
    } catch (error) {
      console.error("FAILED TO CREATED NEW USER", error.response.data.message);
      toast.error("Failed to create error");
      set({ isSigningUp: false });
      return set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  // Action
}));
