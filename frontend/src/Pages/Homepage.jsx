import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader, CircleSlash2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import Sidebar from "../components/Sidebar.jsx";
const Homepage = () => {
  const { checkAuth } = useAuthStore();
  const { getUsers, users, selectedUser } = useChatStore();
  // Fetching Tha data
  useEffect(() => {
    checkAuth();
    getUsers();
  }, [checkAuth, getUsers]);
  console.info(users);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="h-[calc(100vh-8rem)] w-full max-w-6xl rounded-lg bg-base-100 shadow-lg">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
