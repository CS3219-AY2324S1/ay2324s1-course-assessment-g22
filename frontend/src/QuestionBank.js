import React from "react";
import { useState, useEffect } from "react";
import Question from "./Question";
import { setQuestionsLS, getQuestionsLS } from "./utils/QuestionQueries";

export default function QuestionBank() {
  useEffect(() => {
    setQuestionsLS();
  }, []);

  const [questions, setQuestions] = useState(() => {
    return getQuestionsLS() || [];
  });

  return questions.map((question) => (
    <Question key={question.id} question={question} />
  ));
}
