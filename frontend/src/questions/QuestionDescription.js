import React from "react";
import { useParams } from "react-router-dom";
import { questionDescriptions } from "./utils/QuestionData";
import parse from "html-react-parser";

export const QuestionDescription = () => {
  const urlPathQnId = useParams();
  const questionId = Number(urlPathQnId.id);
  const question = questionDescriptions.find((qn) => qn.qid === questionId);
  return <div>{parse(question.description)}</div>;
};

export default QuestionDescription;
