import { getLocalStorage, setLocalStorage } from "./LocalStorageQueries";
import { questionData } from "./QuestionData";

/**
 * Queries for questions on local storage
 */

const QUESTION_STORAGE_KEY = "questions";

export function getQuestionsLS() {
  return getLocalStorage(QUESTION_STORAGE_KEY);
}

export function setQuestionsLS() {
  const existingData = getLocalStorage(QUESTION_STORAGE_KEY);

  // Check if local storage is empty for the specified key
  if (!existingData) {
    setLocalStorage(QUESTION_STORAGE_KEY, questionData);
  }
}


export function addQuestionLS(question) {
  const questions = getQuestionsLS();
  questions.push(question);
  setLocalStorage(QUESTION_STORAGE_KEY, questions);
}