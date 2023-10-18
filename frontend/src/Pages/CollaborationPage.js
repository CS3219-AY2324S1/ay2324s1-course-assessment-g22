import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { QuestionDescription } from "../questions/QuestionDescription";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

export default function CollaborationPage({ matchsocket }) {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const urlPathOnId = useParams();
  const room_id = urlPathOnId.roomid;
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState(null);

  const user = auth().username;
  const [otherUser, setOtherUser] = useState(null);

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

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLeave = () => {
    matchsocket.emit("deleteRoomId", room_id);
    navigate("/");
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="text-lg font-semibold p-3 border-b border-gray-300">
            User: {user} | Currently collaborating with: {otherUser}
          </div>
          <Editor
            height="70vh"
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={handleEditorChange}
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
