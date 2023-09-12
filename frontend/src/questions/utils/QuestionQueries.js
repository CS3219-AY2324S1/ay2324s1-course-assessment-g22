import { getLocalStorage, setLocalStorage } from "./LocalStorageQueries";
import { questionData } from "./QuestionData";

/**
 * Queries for questions on local storage
 */

const QUESTION_STORAGE_KEY = "questions";

// Get questions from local storage
export function getQuestionsLS() {
  if (localStorage.getItem(QUESTION_STORAGE_KEY) === null) {
    // initialization
    console.log("setting questionData to local storage");
    setQuestionsLS(questionData);
  }
  return getLocalStorage(QUESTION_STORAGE_KEY);
}

// Set questions to local storage
export function setQuestionsLS(questions) {
  if (questions.length !== 0) {
    setLocalStorage(QUESTION_STORAGE_KEY, questions);
  }

  return getLocalStorage(QUESTION_STORAGE_KEY);
}

export function setQuestionsLS(updatedQuestions) {
  setLocalStorage(QUESTION_STORAGE_KEY, updatedQuestions);
}

export function addQuestionLS(question) {
  const questions = getQuestionsLS();
  questions.push(question);
  setQuestionsLS(questions);
}
