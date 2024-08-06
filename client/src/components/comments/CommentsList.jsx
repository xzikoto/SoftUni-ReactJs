import { useEffect, useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetAllcomments,
} from "../../hooks/useComments";
import CommentsListItem from "./comments-list-item/CommentsListItem";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { validateComment } from "../../utils/validationFormUtils";

const initialValues = {
  text: "",
  datetime: "",
};

export default function CommentsList() {
  const { blogId } = useParams();
  const [comments, setComments] = useGetAllcomments(blogId);
  const deleteComment = useDeleteComment();
  const createComment = useCreateComment();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDropdownClose = () => {
    setOpenDropdownId(null);
  };

  const handleEdit = (id) => {
    console.log("Edit comment with ID:", id);
    // Perform edit action
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

  const createHandler = async (values) => {
    try {
      const newComment = await createComment({ ...values, postId: blogId });
      setComments((oldComments) => [...oldComments, newComment]);
      setValues(initialValues);
    } catch (err) {
      // TODO: Handle the error appropriately
      console.log(err.message);
    }
  };

  const { values, changeHandler, submitHandler, setValues, errors } = useForm(
    initialValues,
    createHandler,
    validateComment
  );

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Discussion (20)
          </h2>
        </div>
        <form className="mb-6" onSubmit={submitHandler}>
          <div className="py-2 px-4 mb-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
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
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Post comment
          </button>
        </form>
        {comments.length > 0
          ? comments.map((comment) => (
              <CommentsListItem
                key={comment._id}
                {...comment}
                isDropdownOpen={openDropdownId === comment._id}
                onDropdownToggle={() => handleDropdownToggle(comment._id)}
                onDropdownClose={handleDropdownClose}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))
          : null}
      </div>
    </section>
  );
}
