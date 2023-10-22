import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
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
    const roomSocket = io(url.roomUrl);
    roomSocket.emit("join_room", room_id);

    roomSocket.on("join_success", (code) => {
      roomSocketRef.current = roomSocket;
      console.log("Saved Code received: " + code);
      setCode(code);
    });

    roomSocket.on("code", (code) => {
      console.log("Code received: " + code);
      setCode(code);
    });

    roomSocket.on("leave_room", () => {
      toast.dismiss();
      toast.warn(`The other user has left the room.`);
    });

    roomSocket.on("end_collab", () => {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
      toast.warn(
        `The other user has ended the collab. Redirecting to home in 5 seconds.`
      );
      setTimeout(() => {
        navigate("/");
      }, 5000);
    });

    return () => {
      roomSocket.disconnect();
    };
  }, [room_id, navigate]);

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
    navigate("/");
  };

  const handleSave = () => {
    roomSocketRef.current.emit("save_code", room_id, code);
    toast.dismiss();
    toast.success(`Code saved!`);
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
        <div className="flex flex-row">
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
        </div>
      </div>
      <div className="flex-1 p-4">
        <QuestionDescription specificTitle={questionTitle} />
      </div>
    </div>
  );
}
