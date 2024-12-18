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
  // console.info(users);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex h-2 items-center justify-center px-4 pt-20">
        <div className="mt-40 h-[100px] w-full max-w-6xl rounded-lg bg-base-100 shadow-lg">
          <div className="flex h-[800px] overflow-hidden rounded-lg">
            <div className="h-[800px] w-[50%] overflow-scroll">
              <Sidebar />
            </div>

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
