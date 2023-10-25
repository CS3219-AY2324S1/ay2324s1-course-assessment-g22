import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import { getQuestions } from "./utils/mongodb/questionApi";

export const QuestionDescription = () => {
  const urlPathOnId = useParams();
  const questionTitle = urlPathOnId.title;
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const getQns = async () => {
      try {
        const qns = await getQuestions();
        const displayQuestion = qns.questions.find(
          (qn) => qn.title === questionTitle
        );
        setQuestion(displayQuestion);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getQns();
  }, [questionTitle]);

  if (question === undefined) {
    return (
      <div className="bg-white p-4">
        <h1 className="text-3xl font-bold mb-4 p-4 rounded shadow-lg">
          {"No Question available"}
        </h1>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Category:</p>
          <p className="text-xl">{"No category available"}</p>
        </div>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Complexity:</p>
          <p className="text-lg">{"No complexity available"}</p>
        </div>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Description:</p>
          <p className="text-gray-700">{"No Description Available"}</p>
        </div>
      </div>
    );
  } else if (question.description === undefined) {
    return (
      <div className="bg-white p-4">
        <h1 className="text-3xl font-bold mb-4 p-4 rounded shadow-lg">
          {question.title}
        </h1>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Category:</p>
          <p className="text-xl">{question.category}</p>
        </div>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Complexity:</p>
          <p className="text-lg">{question.complexity}</p>
        </div>
        <div className="mb-2 p-4 rounded shadow-lg">
          <p className="text-gray-700 font-bold">Description:</p>
          <p className="text-gray-700">{"No Description Available"}</p>
        </div>
      </div>
    );
  }
  const descriptionParas = question.description.split("\n");
  return (
    <div className="bg-white p-4">
      <div className="text-3xl font-bold mb-4 p-4 rounded shadow-lg">
        <h1>{question.title}</h1>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            width: '100%',
          }}
        >
          {question.tags != null && question.tags.map((tag, index) => (
            <li key={index} className="mr-2 my-1">
              <Chip label={tag.name}
                color={tag.type === 'companyQuestion' ? 'warning' : tag.type === 'popularity' ? 'error' : 'success'}
              />
            </li>
          ))}
        </Box>
      </div>
      <div className="mb-2 p-4 rounded shadow-lg">
        <p className="text-gray-700 font-bold">Category:</p>
        <p className="text-xl">{question.category}</p>
      </div>
      <div className="mb-2 p-4 rounded shadow-lg">
        <p className="text-gray-700 font-bold">Complexity:</p>
        <p className="text-lg">{question.complexity}</p>
      </div>
      <div className="mb-2 p-4 rounded shadow-lg">
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
