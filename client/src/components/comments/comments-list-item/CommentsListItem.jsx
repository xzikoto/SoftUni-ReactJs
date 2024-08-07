import "./CommentsListItem.css";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function CommentsListItem({
  _id,
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

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {username} {email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {datetime}
            </time>
          </p>
        </div>
        <>
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
          {isDropdownOpen && (
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
