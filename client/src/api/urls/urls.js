const BASE_API_URL = `${import.meta.env.VITE_API_URL}`;

const DATA_ROUTE = "data";
const AUTH_URL = `${BASE_API_URL}/users`;
const POSTS_ENDPOINT = `${BASE_API_URL}/${DATA_ROUTE}/posts`;
const COMMENTS_ENDPOINT = `${BASE_API_URL}/${DATA_ROUTE}/comments`;

export { BASE_API_URL, AUTH_URL, POSTS_ENDPOINT, COMMENTS_ENDPOINT };
