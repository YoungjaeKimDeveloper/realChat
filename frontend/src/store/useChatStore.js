import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  // State
  messages: [],
  users: [],
  selectedUser: null,
  //   State - Loading
  isUsersLoading: true,
  isMessagesLoading: false,
  // Action
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      console.info("Fetched Users", res.data);
      toast.success("Succeeded in fetching Users");
      set({ isUsersLoading: true });
      set({ users: res.data });
    } catch (error) {
      console.error("Failed to fetch Users info", error.response.data.message);
      toast.error("Failed in fetching Users");
      set({ users: null });
      set({ isUsersLoading: false });
    } finally {
      set({ isUsersLoading: false });
    }
  },
  // ERROR
  getMessages: async (userID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userID}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isMessagesLoading: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    // console.log(messages);
    // set({ messages: [] });
    const { selectedUser, messages } = get();
    // console.log("====================");
    // console.log(selectedUser);
    // console.log(messages);
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );
      console.log(res.data);
      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";

      toast.error(`ERROR IN SENDING MESSAGE: ${errorMessage}`);
    }
  },
  // todo : optimize this funciton later
  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },
}));
