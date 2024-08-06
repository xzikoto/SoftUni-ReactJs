import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useEditComment, useGetOnecomment } from "../../../hooks/useComments";
import { useForm } from "../../../hooks/useForm";
import { validateComment } from "../../../utils/validationFormUtils";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function EditCommentsListItem({ show, onClose, onSubmit, id }) {
  const editComment = useEditComment();
  const [readComment, setReadComment] = useState(null); // State to store the fetched comment
  const { blogId } = useParams();
  const { email } = useAuthContext();

  const initialValues = readComment
    ? {
        text: readComment.text || "",
        datetime: readComment.datetime || "",
      }
    : {
        text: "",
        datetime: "",
      };

  const [comment] = useGetOnecomment(id);

  useEffect(() => {
    if (comment) {
      setReadComment(comment);
    }
  }, [comment]);

  const editHandler = async (values) => {
    try {
      const updatedComment = await editComment(id, {
        ...values,
        datetime: new Date(),
        postId: blogId,
      });

      onSubmit(updatedComment);
      onClose();
    } catch (err) {
      console.error(err.message); // TODO: Handle the error appropriately
    }
  };

  const { values, changeHandler, submitHandler, setValues, errors } = useForm(
    initialValues,
    editHandler,
    validateComment
  );

  // Use effect to update form values when readComment changes
  useEffect(() => {
    if (readComment) {
      setValues({
        text: readComment.text || "",
        datetime: readComment.datetime || "",
      });
    }
  }, [readComment, setValues]);

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{email}</Modal.Header>
      <Modal.Body>
        {readComment ? (
          <form className="mb-6" onSubmit={submitHandler}>
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
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Post comment
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
