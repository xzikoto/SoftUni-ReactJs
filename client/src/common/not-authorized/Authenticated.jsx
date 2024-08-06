import { NavLink } from "react-router-dom";

export default function Authenticated() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl bg-gradient-to-r from-create-light-start to-create-light-end bg-clip-text text-transparent dark:from-create-dark-start dark:to-create-dark-end">
            Hey <br />
            member!
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-gray-400">
            You have been already logged in!
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            You've already been part of our community.
          </p>
          <div className="inline-flex shadow-sm" role="group">
            <NavLink
              to="/blogs"
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Blogs
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
