import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import { QuestionDescription } from "../questions/QuestionDescription";

export default function CollaborationPage() {
  const [code, setCode] = useState("");
  const [socket, setSocket] = useState(null);
  const editorRef = useRef(null);
  const questionTitle = "Linked List Cycle Detection"; // Placeholder
  const otherUser = "Placeholder"; // Placeholder

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("code", (newCode) => {
      setCode(newCode);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit("code", value);
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="text-lg font-semibold p-3 border-b border-gray-300">
            Code Editor | Currently collaborating with: {otherUser}
          </div>
          <Editor
            height="calc(100vh - 100px)"
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={handleEditorChange}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <QuestionDescription specificTitle={questionTitle} />
      </div>
    </div>
  );
}
