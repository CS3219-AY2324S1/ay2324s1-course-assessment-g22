import axios from "axios";
import Cookies from "js-cookie";
import { QUESTIONS_URL } from "../../../Constants";

const fieldsRequired = ["title", "category", "complexity", "description"];

export const addQuestion = async (question) => {
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }
  try {
    await axios
      .post(
        `${QUESTIONS_URL}`,
        {
          title: question.title,
          category: question.category,
          complexity: question.complexity,
          description: question.description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      )
      .then((response) => {
        console.log("Successfully added question to mongodb: ", response.data);
      });
  } catch (error) {
    console.error("Addition of question to mongodb failed: ", error.response);
  }
};

export const getQuestions = async () => {
  const url = `${QUESTIONS_URL}`;
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("_auth")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting questions from mongodb: ", error);
    throw error;
  }
};

export const updateQuestion = async (question, beforeTitle) => {
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }

  try {
    await axios
      .put(
        `${QUESTIONS_URL}/${beforeTitle}`,
        {
          title: question.title,
          category: question.category,
          complexity: question.complexity,
          description: question.description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      )
      .then((response) => {
        console.log("Successfully updated question: ", response.data);
      });
  } catch (error) {
    console.error("Could not update question in mongodb: ", error);
  }
};

export const deleteQuestion = async (question) => {
  try {
    await axios.delete(`${QUESTIONS_URL}/${question.title}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("_auth")}`,
      },
    });
  } catch (error) {
    console.error("Could not delete question in mongodb: ", error);
  }
};

export const deleteQuestions = async (questions) => {
  try {
    for (const question of questions) {
      await deleteQuestion(question);
    }
    console.log("Question deletions successful");
  } catch (error) {
    console.error("Could not delete question in mongodb: ", error);
  }
};
