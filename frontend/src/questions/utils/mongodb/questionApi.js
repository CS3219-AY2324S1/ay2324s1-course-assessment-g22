import axios from "axios";

const LISTEN_PORT_NUMBER = 4567;
const urlPrefix = `http://localhost:${LISTEN_PORT_NUMBER}/api/questions`;
const fieldsRequired = ["title", "category", "complexity", "description"];

export const addQuestion = async (question) => {
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }
  try {
    await axios
      .post(`${urlPrefix}`, {
        title: question.title,
        category: question.category,
        complexity: question.complexity,
        description: question.description,
      })
      .then((response) => {
        console.log("Successfully added question to mongodb: ", response.data);
      });
  } catch (error) {
    console.error("Addition of question to mongodb failed: ", error.response);
  }
};

export const getQuestions = async () => {
  const url = `${urlPrefix}`;
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-type": "application/json",
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
      .put(`${urlPrefix}/${beforeTitle}`, {
        title: question.title,
        category: question.category,
        complexity: question.complexity,
        description: question.description,
      })
      .then((response) => {
        console.log("Successfully updated question: ", response.data);
      });
  } catch (error) {
    console.error("Could not update question in mongodb: ", error);
  }
};

export const deleteQuestion = async (question) => {
  try {
    await axios.delete(`${urlPrefix}/${question.title}`);
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
