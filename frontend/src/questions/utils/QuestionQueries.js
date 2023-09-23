import { getLocalStorage, setLocalStorage } from "./LocalStorageQueries";
import { questionData } from "./QuestionData";
import {
  handleAddQuestion,
  handleGetQuestions,
  handleUpdateQuestion,
  handleDeleteQuestion,
} from "./mongodb/questionApi";

/**
 * Queries for questions on mongodb
 */

// Get questions from mongodb
export function getQuestions() {
  const a = handleGetQuestions();
  console.log(a);
  return handleGetQuestions();
}

// Set questions to mongodb
export function deleteQuestions(questions) {
  for (const question in questions) {
    handleDeleteQuestion(question);
  }
}

// Add questions to mongodb
export function addQuestion(question) {
  handleAddQuestion(question);
}

// // Get questions from local storage
// export function getQuestionsLS() {
//   if (localStorage.getItem(QUESTION_STORAGE_KEY) === null) {
//     // initialization
//     console.log("setting questionData to local storage");
//     setQuestionsLS(questionData);
//   }
//   return getLocalStorage(QUESTION_STORAGE_KEY);
// }

// // Set questions to mongodb
// export function setQuestionsLS(questions) {
//   setLocalStorage(QUESTION_STORAGE_KEY, questions);
// }

// // Add questions to mongodb
// export function addQuestionLS(question) {
//   const questions = getQuestions();
//   questions.push(question);
//   setQuestionsLS(questions);
// }
