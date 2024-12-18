import React from "react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { LoaderCircle } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTIme } from "../lib/utils";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  // Zustand로 부터 정보 가져오기
  const { messages, getMessages, selectedUser, isMessagesLoading } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);
  // 로딩중..
  if (isMessagesLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoaderCircle className="loading size-20" />
      </div>
    );
  }

  console.info("=============");
  console.log(authUser._id);
  console.info("=============");
  return (
    <div className="m-4 h-screen w-screen">
      <ChatHeader />
      <div className="flex-1 space-y-4 overflow-scroll overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderID === authUser._id ? "chat-end" : "chat-start"} `}
          >
            <div className="avatar chat-image">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderID === authUser._id
                      ? authUser.profilePic || "../../public/avartar.png"
                      : selectedUser.profilePic || "../../public/avartar.png"
                  }
                  alt="profile-pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="ml-1 text-xs opacity-50">
                <div className="flex flex-col items-center">
                  <p>{formatMessageTIme(message.createdAt)}</p>
                </div>
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="mb-2 rounded-md sm:max-w-[200px]"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
