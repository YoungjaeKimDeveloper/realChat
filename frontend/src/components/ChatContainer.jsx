import React from "react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { LoaderCircle } from "lucide-react";
const ChatContainer = () => {
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
  return (
    <div>
      {/* Header */}
      <ChatHeader/>
      {/* Messages */}
      <p>Messages...</p>
      {/* Messages Input */}
      <MessageInput/>
    </div>
  );
};

export default ChatContainer;
