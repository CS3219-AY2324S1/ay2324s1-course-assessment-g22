import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import { QuestionDescription } from "../questions/QuestionDescription";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import lodashDebounce from "lodash.debounce";
import { languages } from "./ProgrammingLanguages";
import { COLLAB_URL, CHAT_URL } from "../Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "../Chat/Chat";

export default function CollaborationPage({ matchsocket }) {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const urlPathOnId = useParams();
  const room_id = urlPathOnId.roomid;
  const editorRef = useRef(null);
  const roomSocketRef = useRef(null);
  const chatSocketRef = useRef(null);
  const [code, setCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState(null);
  const [language, setLanguage] = useState(languages[1]);
  const user = auth().username;
  const [otherUser, setOtherUser] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const updateUnreadMessages = () => {
    setUnreadMessagesCount((count) => count + 1);
    console.log("Incrementing unread messages " + unreadMessagesCount);
  };

  useEffect(() => {
    const roomSocket = io(COLLAB_URL, {
      path: "/api/collab/socket.io",
    });
    const chatSocket = io(CHAT_URL, {
      path: "/api/chat/socket.io",
    });
    chatSocketRef.current = chatSocket;
    roomSocket.emit("join_room", room_id);
    chatSocket.emit("join_room", user, Cookies.get("_auth"));

    roomSocket.on("join_success", (code, lang) => {
      roomSocketRef.current = roomSocket;
      console.log("Saved Code received: " + code);
      setCode(code);
      console.log("Language received: " + lang);
      setLanguage(languages.find((l) => l.name === lang));
    });

    roomSocket.on("join_room", () => {
      toast.dismiss();
      toast.success(`${otherUser} has joined the room!`);
    });

    roomSocket.on("code", (code) => {
      console.log("Code received: " + code);
      setCode(code);
    });

    roomSocket.on("change_language", (lang) => {
      console.log("Language changed to: " + lang.name);
      setLanguage(lang);
      toast.success(`${otherUser} changed language to ${lang.name}`);
    });

    roomSocket.on("leave_room", () => {
      toast.dismiss();
      toast.warn(`${otherUser} has left the room.`);
    });

    roomSocket.on("end_collab", () => {
      setTimeout(() => {
        toast.dismiss();
        toast.warn(
          `The other user has ended the collab. Redirecting to home in 5 seconds.`
        );
      }, 2000);
      setTimeout(() => {
        navigate("/");
      }, 7000);
    });

    chatSocketRef.current.on("notify", () => {
      updateUnreadMessages();
    });

    return () => {
      roomSocket.disconnect();
    };
  }, [room_id, navigate, otherUser]);

  useEffect(() => {
    if (roomSocketRef.current) {
      roomSocketRef.current.emit("code", room_id, code);
    }
  }, [code, room_id]);

  useEffect(() => {
    matchsocket.emit("queryRoomId", room_id, Cookies.get("_auth"));
    matchsocket.on("roominfo", (result) => {
      if (result[0] !== undefined) {
        setQuestionTitle(result[0].question);
        if (result[0].username === user) {
          setOtherUser(result[1].username);
        } else {
          setOtherUser(result[0].username);
        }
      } else {
        navigate("/");
      }
    });
  }, [room_id, matchsocket, user, navigate]);

  const debounceHandleEditorChange = lodashDebounce((value) => {
    // With debouncing to prevent stress on server
    // Only when user stops typing for 300ms, then send code to server
    setCode(value);
  }, 300);

  const handleEnd = () => {
    matchsocket.emit("deleteRoomId", room_id);
    roomSocketRef.current.emit("end_collab", room_id);
    chatSocketRef.current.emit("end_collab", room_id);
    // To give some time for history to update
    setTimeout(() => navigate("/"), 100);
  };

  const handleSave = () => {
    roomSocketRef.current.emit("save_code", room_id, code);
    toast.dismiss();
    toast.success(`Code saved!`);
  };

  const handleLanguageChange = (lang) => {
    roomSocketRef.current.emit("change_language", room_id, lang);
    setLanguage(lang);
  };

  const handleToggleChat = () => {
    console.log("Resetting unread messages");
    setUnreadMessagesCount(0);
    setChatOpen(!isChatOpen);
  };

  const handlePageClick = () => {
    if (isChatOpen) {
      setChatOpen(false);
    }
  };

  return (
    <div className="flex flex-row h-screen" onClick={handlePageClick}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="dark"
      />
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="text-lg font-semibold p-3 border-b border-gray-300">
            User: {user} | Currently collaborating with: {otherUser}
          </div>
          <Editor
            height="70vh"
            language={
              language === undefined ? languages[1].value : language.value
            }
            defaultValue={code}
            value={code}
            options={{ formatOnType: true, formatOnPaste: true }}
            onChange={debounceHandleEditorChange}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <div className="flex flex-row">
          <div className="p-1"></div>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 p-10 focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <div className="p-1"></div>
          <button
            onClick={handleEnd}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 p-10 focus:outline-none focus:shadow-outline"
          >
            End Collaboration
          </button>
          <div className="p-1"></div>
          <button
            onClick={handleToggleChat}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 p-10 focus:outline-none focus:shadow-outline relative"
          >
            Chat
            {unreadMessagesCount > 0 &&
              !isChatOpen && ( // Step 2: Display the red circle if there are unread messages
                <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                  {unreadMessagesCount}
                </div>
              )}
          </button>
          <div className="py-2 px-4 rounded mt-4 p-10 focus:outline-none focus:shadow-outline">
            <Select
              placeholder={"Select Language"}
              options={languages}
              onChange={handleLanguageChange}
              value={language}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <QuestionDescription specificTitle={questionTitle} />
      </div>
      {isChatOpen && (
        <Chat
          user={user}
          otherUser={otherUser}
          socket={chatSocketRef.current}
        />
      )}
    </div>
  );
}
