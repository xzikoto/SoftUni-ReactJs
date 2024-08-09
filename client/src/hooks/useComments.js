import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";
import likesAPI from "../api/likes-api";

export function useGetAllcomments(blogId) {
  const [comments, setComments] = useState([]);

  const fetchcomments = async () => {
    try {
      const result = await commentsAPI.getAll(blogId);
      setComments(result);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchcomments();
  }, []);

  return [comments, fetchcomments];
}

export function useListAllcomments() {
  const [comments, setcomments] = useState([]);

  const fetchcomments = async () => {
    try {
      const result = await commentsAPI.listAll();
      setcomments(result);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchcomments();
  }, []);

  return [comments, fetchcomments];
}

export function useGetMostLikedComments() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const result = await commentsAPI.listAll();

      const commentsWithLikes = await Promise.all(
        result.map(async (comment) => {
          const likes = await likesAPI.getAll(comment._id);
          return { ...comment, likes: likes.length };
        })
      );

      const sortedComments = commentsWithLikes.sort(
        (a, b) => b.likes - a.likes
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return [comments, fetchComments];
}

export function useGetOnecomment(commentId) {
  const [comment, setcomment] = useState(null);

  useEffect(() => {
    if (!commentId) return;

    (async () => {
      try {
        const result = await commentsAPI.get(commentId);
        setcomment(result);
      } catch (error) {
        console.error("Failed to fetch comment:", error);
      }
    })();
  }, [commentId]);

  return [comment, setcomment];
}

export function useCreateComment() {
  const commentCreateHandler = (commentData) => commentsAPI.create(commentData);

  return commentCreateHandler;
}

export function useEditComment() {
  const commentEditHandler = (id, data) => commentsAPI.put(id, data);

  return commentEditHandler;
}

export function useDeleteComment() {
  const commentCreateHandler = (id) => commentsAPI.del(id);

  return commentCreateHandler;
}
