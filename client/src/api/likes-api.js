import requester from "./requester";
import { LIKES_ENDPOINT } from "./urls/urls";

export const getAll = (commentId) => {
  const params = new URLSearchParams({
    where: `commentId="${commentId}"`,
  });

  return requester.get(`${LIKES_ENDPOINT}?${params}`);
};

export const create = (likeData) =>
  requester.post(`${LIKES_ENDPOINT}`, likeData);

export const del = (id) => requester.del(`${LIKES_ENDPOINT}/${id}`);

export const put = (id, likeData) =>
  requester.put(`${LIKES_ENDPOINT}/${id}`, likeData);

const commentsAPI = {
  getAll,
  create,
  del,
  put,
};

export default commentsAPI;
