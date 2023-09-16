/**
 * Queries for local storage
 */

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
