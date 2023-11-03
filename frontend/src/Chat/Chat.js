import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

/**
1. Press Chat button to bring up Chat Window
2. Press Chat button or click outside of Chat Window to minimise Chat Window
3. Press Send or Enter to send messages
4. Text-wrapping
5. Auto-scrolls to bottom on new message sent/received
 */

export default function Chat({ user, otherUser, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const urlPathOnId = useParams();
  const room_id = urlPathOnId.roomid;

  const messageContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit(
        "new_message",
        otherUser,
        room_id,
        user,
        message,
        Cookies.get("_auth")
      );
      setMessages([...messages, { user: user, text: message }]);
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit("get_chat", user, room_id, Cookies.get("_auth"));
  }, [socket, room_id, user]);

  socket.on("get_chat", (chat_history) => {
    setMessages(chat_history);
  });

  socket.on("new_message", (message) => {
    setMessages([...messages, message]);
  });

  return (
    <div
      className="fixed bottom-0 right-0 bg-gray-200 rounded-lg border border-blue-500 p-4 shadow-md w-2/5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-64 overflow-y-auto mb-4" ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2`}>
            <div
              className={`inline-block rounded-lg p-2 ${
                msg.user === user
                  ? "bg-green-400 text-white float-right clear-both"
                  : "bg-blue-400 text-white float-left clear-both"
              }`}
              style={{
                margin: "2px",
                maxWidth: "30vw",
              }}
            >
              <div className="break-words">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full rounded-l-lg p-2 outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r-lg p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
