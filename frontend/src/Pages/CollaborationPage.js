import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import { QuestionDescription } from "../questions/QuestionDescription";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import lodashDebounce from "lodash.debounce";
import url from "./api/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CollaborationPage({ matchsocket }) {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const urlPathOnId = useParams();
  const room_id = urlPathOnId.roomid;
  const editorRef = useRef(null);
  const roomSocketRef = useRef(null);
  const [code, setCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState(null);
  const user = auth().username;
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    toast.dismiss();
    const roomSocket = io(url.roomUrl);
    roomSocket.emit("join_room", room_id);

    roomSocket.on("join_success", (roomId) => {
      roomSocketRef.current = roomSocket;
    });

    roomSocket.on("full_room", () => {
      console.log("Room is full");
      //TODO Notify user that room is full
    });

    roomSocket.on("code", (code) => {
      console.log("Code received: " + code);
      setCode(code);
    });

    roomSocket.on("leave_room", () => {
      toast.warn(`The other user has left the room.`);
    });

    return () => {
      roomSocket.disconnect();
    };
  }, [room_id]);

  useEffect(() => {
    if (roomSocketRef.current) {
      roomSocketRef.current.emit("code", room_id, code);
    }
  }, [code, room_id]);

  useEffect(() => {
    matchsocket.emit("queryRoomId", room_id);
    matchsocket.on("roominfo", (result) => {
      if (result[0] !== undefined) {
        setQuestionTitle(result[0].question);
        if (result[0].username === user) {
          setOtherUser(result[1].username);
        } else {
          setOtherUser(result[0].username);
        }
      }
    });
  }, [room_id, matchsocket, user]);

  const debounceHandleEditorChange = lodashDebounce((value) => {
    // With debouncing to prevent stress on server
    // Only when user stops typing for 300ms, then send code to server
    setCode(value);
  }, 300);

  const handleLeave = () => {
    matchsocket.emit("deleteRoomId", room_id);
    navigate("/");
  };

  return (
    <div className="flex flex-row h-screen">
      <ToastContainer
        position="top-center"
        autoClose={false}
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
            defaultLanguage="javascript"
            defaultValue={code}
            value={code}
            onChange={debounceHandleEditorChange}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <button
          onClick={handleLeave}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 p-10 focus:outline-none focus:shadow-outline"
        >
          Leave Collaboration
        </button>
      </div>
      <div className="flex-1 p-4">
        <QuestionDescription specificTitle={questionTitle} />
      </div>
    </div>
  );
}
