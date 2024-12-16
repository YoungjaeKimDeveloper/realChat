import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  // State
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isCheckingAuth: true,

  isUpdatingProfile: false,
  onlineUsers: [],
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
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log(res.status);
      set({ authUser: null });
      if (res.status === 200) {
        toast.success("LOGGED OUT SUCCESSFULLY");
        console.info("USER LOGGED OUT");
      }
    } catch (error) {
      console.error("FAILED IN LOGGED OUT", error.response.data.message);
      toast.error("FAILED IN LOGGED OUT");
    }
  },
  login: async (data) => {
    try {
      set({ isLoggingIng: true });
      const res = await axiosInstance.post("/auth/login", data);
      if (res.status === 200) {
        toast.success("Logged In Successfully");
        set({ authUser: res.data.user });
      }
    } catch (error) {
      toast.error("FAILED TO LOGIN");
      set({ isLoggingIng: false });
      set({ authUser: null });
    } finally {
      set({ isLoggingIng: false });
    }
  },
  updateProfile: async (data) => {
    console.log("IMAGE UPDATED: ", data);
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success("User Profile Updated");
      console.log("Response DATA : ", res.data.updateUser);
      set({ authUser: res.data.updateUser });
      console.info("USER DATA UPDATED SUCCESSFULLY", res.data.updateUser);
    } catch (error) {
      set({ isUpdatingProfile: false });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
