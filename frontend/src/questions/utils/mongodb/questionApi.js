import axios from "axios";
import Cookies from "js-cookie";

const LISTEN_PORT_NUMBER = 4567;
const urlPrefix = `http://localhost:${LISTEN_PORT_NUMBER}/api/questions`;
const fieldsRequired = ["title", "category", "complexity", "description"];

function getAuthTokenFromCookie() {
  const authToken = Cookies.get("_auth");
  return authToken || null;
}

export const addQuestion = async (question) => {
  const authToken = getAuthTokenFromCookie();
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }
  try {
    await axios
      .post(
        `${urlPrefix}`,
        {
          title: question.title,
          category: question.category,
          complexity: question.complexity,
          description: question.description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
  const authToken = getAuthTokenFromCookie();
  const url = `${urlPrefix}`;
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting questions from mongodb: ", error);
    throw error;
  }
};

export const updateQuestion = async (question, beforeTitle) => {
  const authToken = getAuthTokenFromCookie();
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }

  try {
    await axios
      .put(
        `${urlPrefix}/${beforeTitle}`,
        {
          title: question.title,
          category: question.category,
          complexity: question.complexity,
          description: question.description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
  const authToken = getAuthTokenFromCookie();
  try {
    await axios.delete(`${urlPrefix}/${question.title}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
