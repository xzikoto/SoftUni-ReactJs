import { NavLink } from "react-router-dom";
import NoPermissions from "../../../common/not-authorized/NoPermissions";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function BlogListItem({
  _ownerId: ownerId,
  _id,
  title,
  date,
  description,
  category,
  author,
  onDeleteClick,
  onEditClick,
}) {
  const { userId, isAuthenticated } = useAuthContext();

  return (
    <article className="flex max-w-xl flex-col items-start justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 cursor-pointer">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={date} className="text-gray-500 dark:text-gray-400">
          {date}
        </time>
        <NavLink
          to={`/blogs/${_id}/details`}
          className="relative z-10 rounded-full bg-gray-200 dark:bg-gray-500 px-3 py-1.5
    font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200
    dark:hover:bg-black-900"
        >
          {category.title}
        </NavLink>
        <NavLink
          to={`/blogs/${_id}/details`}
          className="relative z-10 rounded-full bg-gray-200 dark:bg-gray-500 px-3 py-1.5
    font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200
    dark:hover:bg-black-200"
        >
          OPEN
        </NavLink>
      </div>

      <div className="group relative mt-3">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
          {title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          alt={author.name}
          src={author.imageUrl || "default-image-url"}
          className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {author.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{author.role}</p>
        </div>
        <div className="pr-2 pl-1 flex flex-col items-center justify-center space-y-4 text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md max-w-md mx-auto">
          {ownerId === userId && isAuthenticated ? (
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400 ml-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => onEditClick(_id)}
              >
                <span className="text-gray-800 dark:text-white">Edit</span>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                onClick={() => onDeleteClick(_id)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <span className="text-gray-800 dark:text-white">Delete</span>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <NoPermissions />
          )}
        </div>
      </div>
    </article>
  );
}
