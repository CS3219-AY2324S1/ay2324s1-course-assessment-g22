import { getLocalStorage, setLocalStorage } from "./LocalStorageQueries";
import { questionData } from "./QuestionData";

/**
 * Queries for questions on local storage
 */

const QUESTION_STORAGE_KEY = "questions";

export function getQuestionsLS() {
  const existingData = getLocalStorage(QUESTION_STORAGE_KEY);

  if (!existingData) {
    setLocalStorage(QUESTION_STORAGE_KEY, questionData);
  }

  return getLocalStorage(QUESTION_STORAGE_KEY);
}

export function setQuestionsLS(updatedQuestions) {
  setLocalStorage(QUESTION_STORAGE_KEY, updatedQuestions);
}


export function addQuestionLS(question) {
  const questions = getQuestionsLS();
  questions.push(question);
  setLocalStorage(QUESTION_STORAGE_KEY, questions);
}