import * as request from "./requester";
import { COMMENTS_ENDPOINT } from "./urls/urls";

export const getAll = async () => {
  const result = await request.get(COMMENTS_ENDPOINT);

  const games = Object.values(result);

  return games;
};

export const get = (id) => request.get(`${COMMENTS_ENDPOINT}/${id}`);

export const create = (commentData) =>
  request.post(`${COMMENTS_ENDPOINT}`, commentData);

export const del = (id) => request.del(`${COMMENTS_ENDPOINT}/${id}`);

export const put = (id, commentData) =>
  request.put(`${COMMENTS_ENDPOINT}/${id}`, commentData);

const commentsAPI = {
  getAll,
  get,
  create,
  del,
  put,
};

export default commentsAPI;
