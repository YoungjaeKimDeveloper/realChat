import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { isUsersLoading, getUsers, users, setSelectedUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Loading될때는 skeleton 보여주기
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers?.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-300 transition-all duration-200 lg:w-72">
      <div className="w-full border-b border-base-200 p-5">
        <div className="hidden items-center gap-2 lg:flex">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="w-full overflow-y-auto py-3">
          {filteredUsers?.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex w-full items-center gap-3 p-3 transition-colors hover:bg-base-300 ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "../../public/avartar.png"}
                  alt={user.name}
                  className="size-12 rounded-full object-cover"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900" />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden min-w-0 text-left lg:block">
                <div className="truncate font-medium">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers?.length === 0 && (
            <div className="py-4 text-center text-zinc-500">
              No online users
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
