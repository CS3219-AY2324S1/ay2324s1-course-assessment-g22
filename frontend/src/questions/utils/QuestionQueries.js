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
  return setLocalStorage(QUESTION_STORAGE_KEY, questionData);
}
