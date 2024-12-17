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
      console.error("Failed to fetch Users info", error.message);
      toast.error("Failed in fetching Users");
      set({ users: null });
      set({ isUsersLoading: false });
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userID) => {
    set({ isMessagesLoading: true });
    try {
      const res = axiosInstance.get(`/message/:${userID}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.message);
      set({ isMessagesLoading: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    console.log(messageData);
    // const { selectedUser, messages } = get();
    // try {
    //   const res = await axiosInstance.post(
    //     `/messages/send/${selectedUser._id}`,
    //     messageData,
    //   );
    //   set({ message: [...messages, res.data] });
    // } catch (error) {
    //   toast.error(`ERROR IN SENDING MESSAGES${error.response.data.message}`);
    // }
  },
  // todo : optimize this funciton later
  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },
}));
