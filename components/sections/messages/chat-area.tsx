import React, { useState, useRef, useEffect } from "react";
import { Send, Camera, Paperclip, Mic } from "lucide-react";

interface Message {
  text: string;
  sender: "me" | "other";
  time: string;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Luctas et ultrices posuere cubilia curae.",
      sender: "other",
      time: "1:23pm",
    },
    {
      text: "",
      sender: "other",
      time: "",
    },
    {
      text: "Sit amet risus nullam eget felis eget. Dui varius lorem 😆😆😆",
      sender: "me",
      time: "2:05pm",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      text: inputValue,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate reply after 1s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Got your message!",
          sender: "other",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex-1 flex flex-col border-r border-r-gray-300">
      {/* Chat Header */}
      <div className="p-4 border-b border-b-gray-300 font-bold text-gray-700">
        Esycle
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) =>
          msg.sender === "other" ? (
            <div key={idx} className="max-w-lg">
              {msg.text && (
                <div className="bg-gray-200 p-3 rounded-lg shadow">
                  {msg.text}
                </div>
              )}
              {msg.time && (
                <p className="text-xs text-gray-500 mt-1">
                  Message sent {msg.time}
                </p>
              )}
            </div>
          ) : (
            <div key={idx} className="flex justify-end">
              <div className="max-w-lg">
                <div className="bg-blue-500 text-white p-3 rounded-lg shadow">
                  {msg.text}
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  Message sent {msg.time}
                </p>
              </div>
            </div>
          )
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-2 lg:p-3 border-t border-t-gray-300 flex items-center space-x-1 lg:space-x-2">
        <button className="p-1 lg:p-2 hover:bg-gray-200 rounded-full">
          <Camera
            size={20}
            className="text-gray-500 cursor-pointer w-4 lg:w-5"
          />
        </button>
        <button className="p-1 lg:p-2 hover:bg-gray-200 rounded-full">
          <Paperclip
            size={20}
            className="text-gray-500 cursor-pointer w-4 lg:w-5"
          />
        </button>
        <input
          type="text"
          placeholder="Type something here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-300 rounded-sm lg:rounded-lg px-1 lg:px-3 py-1 lg:py-2 focus:outline-none focus:ring focus:ring-orange-300"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-[6px] lg:p-3 rounded-lg"
        >
          <Send size={18} />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Mic size={20} className="text-gray-500 cursor-pointer w-4 lg:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
