import { useEffect, useState } from "react";
import likesApi from "../api/likes-api";

export function useGetAllLikes(commentId) {
  const [likes, setlikes] = useState([]);

  const fetchLikes = async () => {
    try {
      const result = await likesApi.getAll(commentId);
      setlikes(result);
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return [likes, fetchLikes];
}

export function useCreateLike() {
  const likeCreateHandler = (likeData) => likesApi.create(likeData);

  return likeCreateHandler;
}

export function useEditLike() {
  const likeEditHandler = (id, data) => likesApi.put(id, data);

  return likeEditHandler;
}

export function useDeleteLike() {
  const likeCreateHandler = (id) => likesApi.del(id);

  return likeCreateHandler;
}
