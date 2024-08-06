import requester from "./requester";
import { COMMENTS_ENDPOINT } from "./urls/urls";

export const getAll = (blogId) => {
  const params = new URLSearchParams({
    where: `postId="${blogId}"`,
    load: `author=_ownerId:users`,
  });

  return requester.get(`${COMMENTS_ENDPOINT}?${params}&sortBy=datetime%20desc`);
};

export const get = (id) => requester.get(`${COMMENTS_ENDPOINT}/${id}`);

export const create = (commentData) =>
  requester.post(`${COMMENTS_ENDPOINT}`, commentData);

export const del = (id) => requester.del(`${COMMENTS_ENDPOINT}/${id}`);

export const put = (id, commentData) =>
  requester.put(`${COMMENTS_ENDPOINT}/${id}`, commentData);

const commentsAPI = {
  getAll,
  get,
  create,
  del,
  put,
};

export default commentsAPI;
