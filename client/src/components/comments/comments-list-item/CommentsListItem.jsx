import "./CommentsListItem.css";
import { useAuthContext } from "../../../contexts/AuthContext";
import Like from "../comment-like/Like";
import { useState, useEffect } from "react";
import {
  useCreateLike,
  useDeleteLike,
  useGetAllLikes,
} from "../../../hooks/useLikes";

export default function CommentsListItem({
  _id,
  postId,
  text,
  datetime,
  author: { username, email, _id: ownerId },
  isDropdownOpen,
  onDropdownToggle,
  onDropdownClose,
  onEdit,
  onRemove,
}) {
  const { userId, isAuthenticated } = useAuthContext();

  const [likes, fetchLikes] = useGetAllLikes(_id);
  const [isUserLiked, setIsUserLiked] = useState(false);

  const createLike = useCreateLike();
  const deleteLike = useDeleteLike();

  useEffect(() => {
    if (likes) {
      const isLiked = likes.some((like) => like._ownerId === userId);
      setIsUserLiked(isLiked);
    }
  }, [likes, userId]);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(_id);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(_id);
    }
  };

  const handleLike = async () => {
    const like = likes.find((like) => like._ownerId === userId);
    if (like) {
      try {
        await deleteLike(like._id);
        setIsUserLiked(false);

        fetchLikes();
      } catch (error) {
        console.error("Error deleting like:", error);
      }
    } else {
      try {
        await createLike({
          _ownerId: ownerId,
          commentId: _id,
          postId: postId,
        });

        setIsUserLiked(true);
        fetchLikes();
      } catch (error) {
        console.error("Error creating like:", error);
      }
    }
  };

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {username} {email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={datetime} title={datetime}>
              {datetime}
            </time>
          </p>
        </div>
        <>
          <div className="flex items-center space-x-2">
            {!isUserLiked ? (
              <Like onClick={handleLike} />
            ) : (
              <span
                onClick={handleLike}
                className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
              >
                Liked!
              </span>
            )}

            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
              {likes.length}
            </span>

            {ownerId === userId && isAuthenticated && (
              <button
                onClick={onDropdownToggle}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
            )}
          </div>
          {isDropdownOpen && userId == ownerId && (
            <div
              className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800"
              onClick={onDropdownClose}
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li
                  className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={handleEdit}
                >
                  <span className="text-gray-800 dark:text-white">Edit</span>
                </li>
                <li
                  className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={handleRemove}
                >
                  <span className="text-gray-800 dark:text-white">Remove</span>
                </li>
              </ul>
            </div>
          )}
        </>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{text}</p>
    </article>
  );
}
