import { NavLink } from "react-router-dom";

export default function LatestCommentsListItem({
  _id,
  text,
  datetime,
  _ownerId,
}) {
  return (
    <article className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl transition-shadow duration-300 relative">
      <footer className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            ownerId: {_ownerId}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <time dateTime={datetime} title={new Date(datetime).toDateString()}>
              {datetime}
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
        {text}
      </p>
      <NavLink
        className="relative z-10 rounded-full bg-gray-200 dark:bg-gray-500 px-3 py-1.5
        font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200
        dark:hover:bg-black-900"
        to={`/latest-comments/${_id}`}
      >
        Open
      </NavLink>
    </article>
  );
}
