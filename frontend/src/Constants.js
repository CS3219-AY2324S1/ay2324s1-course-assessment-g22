// API URLS
export const NGINX_GATEWAY = "http://localhost:3000";

export const USERS_BASE_URL = `${NGINX_GATEWAY}`;
export const QUESTIONS_URL = `${NGINX_GATEWAY}/api/questions`;
export const MATCHING_URL = `${NGINX_GATEWAY}`;
export const COLLAB_URL = `${NGINX_GATEWAY}`;
export const HISTORY_URL = `${NGINX_GATEWAY}/api/history`;
export const CHAT_URL = `${NGINX_GATEWAY}`;

// JWT TOKEN - Remember to change in backend folders as well
export const TOKEN_EXPIRE_TIME = 15; // in minutes
export const TOKEN_REFRESH_TIME = 300000; // in milliseconds
