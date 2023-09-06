import React from "react";
import { useState, useEffect } from "react";
import Question from "./Question";

export default function QuestionBank() {
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify());
  }, []);

  const [questions, setQuestions] = useState([]);

  return <Question />;
}
