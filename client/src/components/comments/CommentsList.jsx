import { useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetAllcomments,
} from "../../hooks/useComments";
import CommentsListItem from "./comments-list-item/CommentsListItem";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validateComment } from "../../utils/validationFormUtils";
import EditCommentsListItem from "./edit-comments-list-item/EditCommentsListItem";
import GoogleAI from "../google-gemini/GoogleAI";
import { useAuthContext } from "../../contexts/AuthContext";

const initialValues = {
  text: "",
  datetime: "",
};

export default function CommentsList() {
  const { blogId } = useParams();
  const { userId } = useAuthContext();
  const [comments, setComments] = useGetAllcomments(blogId, userId);
  const deleteComment = useDeleteComment();
  const createComment = useCreateComment();

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { values, changeHandler, submitHandler, setValues, errors } = useForm(
    initialValues,
    async (values) => {
      try {
        const newComment = await createComment({
          ...values,
          postId: blogId,
          datetime: new Date(),
        });
        setComments((oldComments) => {
          const updatedComments = [...oldComments, newComment];
          updatedComments.sort(
            (a, b) => new Date(b.datetime) - new Date(a.datetime)
          );
          return updatedComments;
        });
        setValues(initialValues);
      } catch (err) {
        console.log(err.message);
      }
    },
    validateComment
  );

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDropdownClose = () => {
    setOpenDropdownId(null);
  };

  const handleEdit = (id) => {
    setEditCommentId(id);
    setOpenEditModal(true);
    handleDropdownClose();
  };

  const handleSubmitEdit = (newComment) => {
    setOpenEditModal(false);
    setComments((oldComments) => {
      const updatedComments = oldComments.map((comment) =>
        comment._id === newComment._id ? newComment : comment
      );
      updatedComments.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      return updatedComments;
    });
  };

  const handleRemove = async (id) => {
    try {
      await deleteComment(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete comment:", err.message);
    }
  };

  const handleGeneratedText = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      text: text.trim().replace(/^"|"$/g, ""),
    }));
  };

  return (
    <>
      <EditCommentsListItem
        show={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setEditCommentId(null);
        }}
        id={editCommentId}
        onSubmit={handleSubmitEdit}
      />
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Discussion ({comments.length})
            </h2>
          </div>
          <form
            className="mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler(e);
            }}
          >
            <div className="py-2 px-4 mb-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <label htmlFor="text" className="sr-only">
                Your comment
              </label>
              <textarea
                id="text"
                name="text"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none dark:text-gray-100 dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                value={values.text}
                onChange={changeHandler}
              ></textarea>
              {errors.text && (
                <span className="text-red-500 text-sm">{errors.text}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-create-light-start to-create-light-end hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-gradient-to-br dark:from-green-400 dark:to-blue-600 dark:hover:bg-gradient-to-bl dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Post comment
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <GoogleAI
                  title={blogId.title}
                  description={blogId.description}
                  onGenerate={handleGeneratedText}
                />
              </button>
            </div>
          </form>
          {comments.length > 0
            ? comments.map((comment) => (
                <CommentsListItem
                  key={comment._id}
                  {...comment}
                  isDropdownOpen={openDropdownId === comment._id}
                  onDropdownToggle={() => handleDropdownToggle(comment._id)}
                  onDropdownClose={handleDropdownClose}
                  onEdit={() => handleEdit(comment._id)}
                  onRemove={handleRemove}
                />
              ))
            : null}
        </div>
      </section>
    </>
  );
}
