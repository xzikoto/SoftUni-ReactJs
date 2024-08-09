const BASE_API_URL = `${import.meta.env.VITE_API_URL}`;

const DATA_ROUTE = "data";
const POSTS_ENDPOINT = `${BASE_API_URL}/${DATA_ROUTE}/posts`;
const COMMENTS_ENDPOINT = `${BASE_API_URL}/${DATA_ROUTE}/comments`;
const LIKES_ENDPOINT = `${BASE_API_URL}/${DATA_ROUTE}/likes`;

const AUTH_URL = `${BASE_API_URL}/users`;
const GOOGLE_AUTH_URL = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=`;

export {
  BASE_API_URL,
  AUTH_URL,
  GOOGLE_AUTH_URL,
  POSTS_ENDPOINT,
  COMMENTS_ENDPOINT,
  LIKES_ENDPOINT,
};
