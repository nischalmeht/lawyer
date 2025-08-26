import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { Check, CheckCheck, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/slice/chatSlice";
import ChatHeader from "./ChatHeader";

const ChatMessages = ({ selectedUser, messages, loggedInUser,setSelectedChat ,setLoginData, setSidebarOpen, isTyping, onlineUsers }) => {
  const bottomRef = useRef(null);
  const dispatch = useDispatch();
  // Deduplicate messages
  const uniqueMessages = useMemo(() => {
    if (!messages) return [];
    const seen = new Set();
    return messages.filter((message) => {
      if (seen.has(message._id)) {
        return false;
      }
      seen.add(message._id);
      return true;
    });
  }, [messages]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser, uniqueMessages]);

  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch(sendMessage({chatId: setSelectedChat, text: message, image: null}));
    setMessage("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <ChatHeader user={selectedUser} setSidebarOpen={setSidebarOpen} isTyping={isTyping} onlineUsers={onlineUsers} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-h-[calc(100vh-215px)] overflow-y-auto p-2 space-y-2 custom-scroll">
          {!selectedUser ? (
            <p className="text-gray-400 text-center mt-20">
              Please select a user to start chatting 📩
            </p>
          ) : (
            <>
              {uniqueMessages.map((e, i) => {
                const isSentByMe = e.sender === setLoginData?._id;
                const uniqueKey = `${e._id}-${i}`;
                return (
                  <div
                    className={`flex flex-col gap-1 mt-2 ${
                      isSentByMe ? "items-start" : "items-end"
                    }`}
                    key={uniqueKey}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-sm ${
                        isSentByMe
                          ? "bg-gray-700 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {e.messageType === "image" && e.image && (
                        <div className="relative group">
                          <img
                            src={e.image.url}
                            alt="shared"
                            className="max-w-full h-auto rounded-lg"
                          />
                        </div>
                      )}

                      {e.text && <p className="mt-1">{e.text}</p>}
                    </div>

                    <div
                      className={`flex items-center gap-1 text-xs text-gray-400 ${
                        isSentByMe ? "pl-2 flex-row-reverse" : "pr-2"
                      }`}
                    >
                      <span>{moment(e.createdAt).format("hh:mm A . MMM D")}</span>

                      {isSentByMe && (
                        <div className="flex items-center ml-1">
                          {e.seen ? (
                            <div className="flex items-center gap-1 text-blue-400">
                              <CheckCheck className="w-3 h-3" />
                              {e.seenAt && (
                                <span>{moment(e.seenAt).format("hh:mm A")}</span>
                              )}
                            </div>
                          ) : (
                            <Check className="w-3 h-3 text-gray-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
