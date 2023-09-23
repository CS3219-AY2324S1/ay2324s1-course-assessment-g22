import axios from "axios";

const localhost = "http://localhost";
const LISTEN_PORT_NUMBER = 4567;
const urlPrefix = "/api/questions";
const fieldsRequired = ["title", "category", "complexity", "description"];

export const handleAddQuestion = ({ question }) => {
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }

  const questionInfo = {
    title: question.title,
    category: question.category,
    complexity: question.complexity,
    description: question.description,
  };

  axios
    .post(`${localhost}:${LISTEN_PORT_NUMBER}${urlPrefix}`, questionInfo)
    .then((response) => {
      console.log("Successfully added question to mongodb: ", response.data);
    })
    .catch((error) => {
      console.error("Addition of question to mongodb failed: ", error.response);
    });
};

export const handleGetQuestions = () => {
  try {
    axios
      .get(`${localhost}:${LISTEN_PORT_NUMBER}${urlPrefix}`)
      .then((response) => {
        // Handle the response data here
        // console.log("Response Data: ", response.data);
        return response.data; // List of question objects with relevant fields
      });
  } catch (error) {
    console.error("Could not get questions from mongodb: ", error);
  }
};

export const handleUpdateQuestion = ({ question }) => {
  if (!fieldsRequired.every((field) => field in question)) {
    console.error("Some fields for question are not present!");
    return;
  }

  const questionInfo = {
    title: question.title,
    category: question.category,
    complexity: question.complexity,
    description: question.description,
  };

  try {
    axios
      .put(
        `${localhost}:${LISTEN_PORT_NUMBER}${urlPrefix}/${question.title}`,
        questionInfo
      )
      .then((response) => {
        // Handle the response data here
        console.log("Response Data:", response.data);
      });
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Could not update question in mongodb: ", error);
  }
};

export const handleDeleteQuestion = ({ question }) => {
  try {
    axios
      .delete(
        `${localhost}:${LISTEN_PORT_NUMBER}${urlPrefix}/${question.title}`
      )
      .then((response) => {
        console.log("Delete Request Successful");
      });
  } catch (error) {
    console.error("Could not delete question in mongodb: ", error);
  }
};
