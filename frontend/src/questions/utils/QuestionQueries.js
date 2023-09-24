import { questionData } from "./QuestionData";
import { getLocalStorage, setLocalStorage } from "./LocalStorageQueries";

/**
 * Queries for questions on local storage
 * DEPRECATED
 */

const QUESTION_STORAGE_KEY = "questions";

// Get questions from local storage
export function getQuestions() {
  if (localStorage.getItem(QUESTION_STORAGE_KEY) === null) {
    // initialization
    console.log("setting questionData to local storage");
    setQuestions(questionData);
  }
  return getLocalStorage(QUESTION_STORAGE_KEY);
}

// Set questions to local storage
export function setQuestions(questions) {
  setLocalStorage(QUESTION_STORAGE_KEY, questions);
}

// // Add questions to local storage
export function addQuestion(question) {
  const questions = getQuestions();
  questions.push(question);
  setQuestions(questions);
}
