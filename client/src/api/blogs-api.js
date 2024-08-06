import * as request from "./requester";
import { POSTS_ENDPOINT } from "./urls/urls";

export const getAll = async () => {
  const result = await request.get(POSTS_ENDPOINT);

  const games = Object.values(result);

  return games;
};

export const get = (id) => request.get(`${POSTS_ENDPOINT}/${id}`);

export const create = (blogData) => request.post(`${POSTS_ENDPOINT}`, blogData);

export const del = (id) => request.del(`${POSTS_ENDPOINT}/${id}`);

export const put = (id, blogData) =>
  request.put(`${POSTS_ENDPOINT}/${id}`, blogData);

const blogsAPI = {
  getAll,
  get,
  create,
  del,
  put,
};

export default blogsAPI;
