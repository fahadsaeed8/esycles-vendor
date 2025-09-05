// app/vendor/messaging/page.tsx   (or src/app/vendor/messaging/page.tsx)
"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Sender = "vendor" | "customer";

type AttachmentType = "image" | "video" | "other";

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: AttachmentType;
}

type Message = {
  id: number;
  sender: Sender;
  text?: string;
  time: string;
  read: boolean;
  attachments?: Attachment[];
};

type Conversation = {
  id: number;
  name: string;
  lastMessagePreview: string;
  unread: number;
  online?: boolean;
};

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export default function MessagingChatSystem() {
  // Conversations list
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Customer A (Bulk Order)",
      lastMessagePreview: "Sure, we'll confirm qty.",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Customer B (RFQ #1023)",
      lastMessagePreview: "Send your quotation",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Business Partner X",
      lastMessagePreview: "Contract draft attached",
      unread: 1,
      online: true,
    },
  ]);

  // Messages per conversation (mock seed)
  const [convoMessages, setConvoMessages] = useState<Record<number, Message[]>>(
    {
      1: [
        {
          id: 1,
          sender: "customer",
          text: "Hello, I want to know about bulk order pricing.",
          time: "10:00 AM",
          read: true,
        },
        {
          id: 2,
          sender: "vendor",
          text: "Sure! How many units are you planning to order?",
          time: "10:02 AM",
          read: true,
        },
      ],
      2: [
        {
          id: 1,
          sender: "customer",
          text: "Please send your quotation for 50 units.",
          time: "09:20 AM",
          read: false,
        },
      ],
      3: [
        {
          id: 1,
          sender: "customer",
          text: "Let’s finalize contract.",
          time: "Yesterday",
          read: false,
        },
      ],
    }
  );

  const [activeConvId, setActiveConvId] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<File[]>([]);
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convoMessages, activeConvId]);

  // Helper: open conversation and mark read
  const openConversation = (id: number) => {
    setActiveConvId(id);
    // mark messages as read for this convo
    setConvoMessages((prev) => {
      const copy = { ...prev };
      copy[id] = (copy[id] ?? []).map((m) => ({ ...m, read: true }));
      return copy;
    });
    // zero out unread badge
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
    setShowSidebarMobile(false);
  };

  // Send message (text + attachments)
  const sendMessage = () => {
    if (!newMessage.trim() && pendingAttachments.length === 0) return;

    const attachments: Attachment[] = pendingAttachments.map((f) => ({
      id: uid("att_"),
      name: f.name,
      url: URL.createObjectURL(f),
      type: (f.type.startsWith("image") ? "image" : "other") as AttachmentType,
    }));

    const msg: Message = {
      id: Date.now(),
      sender: "vendor",
      text: newMessage.trim() || undefined,
      time: nowTime(),
      read: false,
      attachments: attachments.length ? attachments : undefined,
    };

    setConvoMessages((prev) => {
      const conv = prev[activeConvId] ?? [];
      return { ...prev, [activeConvId]: [...conv, msg] };
    });

    // update conversation preview & unread remains same for active (we are in it)
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessagePreview:
                msg.text ?? `Attachment: ${attachments.length}`,
              unread: 0,
            }
          : c
      )
    );

    setNewMessage("");
    setPendingAttachments([]);

    // Simulate other side typing & reply after a small delay
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        sender: "customer",
        text: "Thanks — I will confirm and get back to you.",
        time: nowTime(),
        read: false,
      };
      setConvoMessages((prev) => {
        const conv = prev[activeConvId] ?? [];
        return { ...prev, [activeConvId]: [...conv, reply] };
      });
      // If this convo is not active (it is active), increase unread badge — here active so leave unread 0
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, lastMessagePreview: reply.text ?? "" }
            : c
        )
      );
    }, 1800);
  };

  // Handle file selection
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    // limit number or size if you want — here we just accept
    setPendingAttachments((prev) => [...prev, ...arr]);
    // reset input so same file can be picked again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePendingAttachment = (index: number) => {
    setPendingAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulate marking a vendor message as read (double tick) after some time
  useEffect(() => {
    const t = setInterval(() => {
      // randomly mark vendor messages as read in the active convo (simulate customer reading)
      setConvoMessages((prev) => {
        const conv = [...(prev[activeConvId] ?? [])];
        let changed = false;
        for (let i = 0; i < conv.length; i++) {
          if (conv[i].sender === "vendor" && conv[i].read === false) {
            conv[i] = { ...conv[i], read: true };
            changed = true;
            break;
          }
        }
        if (!changed) return prev;
        return { ...prev, [activeConvId]: conv };
      });
    }, 8000);
    return () => clearInterval(t);
  }, [activeConvId]);

  // Filtered conversations by search
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Emoji insertion
  const emojis = ["😀", "👍", "🎉", "🔥", "🥳", "📦", "💬"];
  const insertEmoji = (e: string) => setNewMessage((s) => s + e);

  // Keyboard shortcut: Enter to send, Shift+Enter newline handled in textarea keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // UI
  return (
    <DashboardLayout>
    <div className="flex h-full border-gray-300 border">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-80 bg-white border-r border-r-gray-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Conversations</h3>
          <button
            onClick={() => {
              setSearch("");
              setConversations((prev) => prev); // noop but could open new convo modal
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            New
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="mb-3 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
        />

        <ul className="overflow-y-auto space-y-3">
          {filteredConversations.length === 0 && (
            <li className="text-sm text-gray-500">No conversations</li>
          )}
          {filteredConversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => openConversation(conv.id)}
              className={`p-3 rounded cursor-pointer hover:bg-gray-100 ${
                conv.id === activeConvId
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{conv.name}</div>
                  <div
                    className="text-xs text-gray-500 truncate"
                    style={{ maxWidth: 220 }}
                  >
                    {conv.lastMessagePreview}
                  </div>
                </div>
                <div className="text-right">
                  {conv.online && (
                    <div className="text-green-500 text-xs">●</div>
                  )}
                  {conv.unread > 0 && (
                    <div className="mt-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile: small sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebarMobile((s) => !s)}
          className="bg-white p-2 rounded shadow"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebarMobile && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-72 bg-white p-4 border-r border-r-gray-300 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Conversations</h3>
              <button onClick={() => setShowSidebarMobile(false)}>Close</button>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="mb-3 w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <ul className="space-y-3">
              {filteredConversations.map((conv) => (
                <li
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  className="p-3 rounded cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{conv.name}</div>
                    {conv.unread > 0 && (
                      <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {conv.lastMessagePreview}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1" onClick={() => setShowSidebarMobile(false)} />
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-b-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-300" />
            <div>
              <div className="font-semibold">
                {conversations.find((c) => c.id === activeConvId)?.name ||
                  "Conversation"}
              </div>
              <div className="text-xs text-gray-500">
                {conversations.find((c) => c.id === activeConvId)?.online
                  ? "Online"
                  : "Offline"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // mark all messages in convo as read
                setConvoMessages((prev) => {
                  const copy = { ...prev };
                  copy[activeConvId] = (copy[activeConvId] ?? []).map((m) => ({
                    ...m,
                    read: true,
                  }));
                  return copy;
                });
                setConversations((prev) =>
                  prev.map((c) =>
                    c.id === activeConvId ? { ...c, unread: 0 } : c
                  )
                );
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Mark read
            </button>
            <button
              onClick={() => {
                // clear conversation messages (simulate)
                setConvoMessages((prev) => ({ ...prev, [activeConvId]: [] }));
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Clear
            </button>
          </div>
        </header>

        {/* Messages */}
        <section className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {(convoMessages[activeConvId] ?? []).map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "vendor" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "customer" && (
                <div className="w-9 h-9 rounded-full bg-gray-400 mr-2 shrink-0" />
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow ${
                  m.sender === "vendor"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {m.text && <div className="whitespace-pre-wrap">{m.text}</div>}
                {m.attachments && m.attachments.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {m.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="w-24 h-24 bg-gray-100 rounded overflow-hidden border border-gray-300"
                      >
                        {/* image preview if image type */}
                        {att.type.startsWith("image/") ? (
                          <img
                            src={att.url}
                            alt={att.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="p-2 text-xs">{att.name}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                  <span>{m.time}</span>
                  {m.sender === "vendor" && <span>{m.read ? "✓✓" : "✓"}</span>}
                </div>
              </div>
              {m.sender === "vendor" && (
                <div className="w-9 h-9 rounded-full bg-blue-400 ml-2 shrink-0" />
              )}
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200" />
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-400" />
              <div>Customer is typing...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        {/* Composer */}
        <footer className="bg-white border-t border-t-gray-300 p-4">
          {/* Attachment previews */}
          {pendingAttachments.length > 0 && (
            <div className="mb-3 flex gap-2 overflow-x-auto">
              {pendingAttachments.map((f, idx) => {
                const url = URL.createObjectURL(f);
                const isImage = f.type.startsWith("image/");
                return (
                  <div
                    key={idx}
                    className="relative w-24 h-24 bg-gray-50 rounded overflow-hidden border border-gray-300"
                  >
                    {isImage ? (
                      <img
                        src={url}
                        alt={f.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-2 text-xs">{f.name}</div>
                    )}
                    <button
                      onClick={() => removePendingAttachment(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmoji((s) => !s)}
              className="p-2 rounded hover:bg-gray-100"
            >
              😊
            </button>

            {/* emoji palette */}
            {showEmoji && (
              <div className="absolute bottom-24 left-6 z-50 bg-white border border-gray-300 p-2 rounded shadow grid grid-cols-7 gap-1">
                {["😀", "👍", "🎉", "🔥", "🥳", "📦", "💬", "😅", "🙌"].map(
                  (e) => (
                    <button
                      key={e}
                      onClick={() => insertEmoji(e)}
                      className="p-1 text-lg hover:bg-gray-100 rounded"
                    >
                      {e}
                    </button>
                  )
                )}
              </div>
            )}

            <label className="p-2 rounded hover:bg-gray-100 cursor-pointer">
              📎
              <input
                ref={fileInputRef}
                onChange={(ev) => handleFiles(ev.target.files)}
                type="file"
                multiple
                className="hidden"
              />
            </label>

            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message — Enter to send, Shift+Enter for new line"
              className="flex-1 border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none"
              rows={1}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </footer>
      </main>
    </div>
    </DashboardLayout>
  );
}
