"use client";
import DashboardLayout from "../../components/layout/dashboard-layout";
import ChatSidebar from "../../components/sections/messages/chat-sidebar";
import ChatArea from "../../components/sections/messages/chat-area";
import Announcements from "../../components/sections/messages/annoucments";

const ChatScreen: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex h-full">
        <ChatSidebar />
        <ChatArea />
        <Announcements />
      </div>
    </DashboardLayout>
  );
};

export default ChatScreen;
