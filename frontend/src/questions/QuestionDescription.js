import React from "react";
import { useParams } from "react-router-dom";
import { questionData } from "./utils/QuestionData";

export const QuestionDescription = () => {
  const urlPathQnId = useParams();
  const questionTitle = urlPathQnId.title;
  const question = questionData.find((qn) => qn.title === questionTitle);
  if (question.description === undefined) {
    return (
      <div className="bg-white p-4 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
        <div className="mb-2">
          <p className="text-gray-700 font-bold">Category:</p>
          <p className="text-xl">{question.category}</p>
        </div>
        <div className="mb-2">
          <p className="text-gray-700 font-bold">Complexity:</p>
          <p className="text-lg">{question.complexity}</p>
        </div>
        <div className="mb-2">
          <p className="text-gray-700 font-bold">Description:</p>
          <p className="text-gray-700">{"No Description Available"}</p>
        </div>
      </div>
    );
  }
  const descriptionParas = question.description.split("\n");
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
      <div className="mb-2">
        <p className="text-gray-700 font-bold">Category:</p>
        <p className="text-xl">{question.category}</p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 font-bold">Complexity:</p>
        <p className="text-lg">{question.complexity}</p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 font-bold">Description:</p>
        <div className="text-gray-700">
          {descriptionParas.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDescription;
