import BlogListItem from "./blog-list-item/BlogListItem";
import CreateBlog from "./create-blog/CreateBlog";
import blogsAPI from "../../api/blogs-api";
import { useGetAllBlogs } from "../../hooks/useBlogs";
import { DeleteBlog } from "./delete-blog/DeleteBlog";
import { useState } from "react";
import EditBlog from "./edit-blog/EditBlog";

export default function BlogList() {
  const [blogs, fetchBlogs] = useGetAllBlogs();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [editBlogId, setEditBlogId] = useState("");

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogsAPI.del(blogId);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const userDeleteClickHandler = (blogId) => {
    if (!blogId) {
      return;
    }

    handleDeleteBlog(blogId);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <CreateBlog
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />

      <DeleteBlog
        show={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => userDeleteClickHandler(deleteBlogId)}
      />

      <EditBlog
        show={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
        id={editBlogId}
      />

      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32 pb-0">
        <section className="bg-white dark:bg-gray-900">
          <p className="mb-6 text-xl font-normal text-center text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here we want to express what the best devs do!
          </p>

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setOpenCreateModal(true)}
              className="text-white inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-create-light-start to-create-light-end hover:scale-105 dark:from-create-dark-start dark:to-create-dark-end focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-blue-500"
            >
              Create
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-0">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogListItem
                  key={blog._id}
                  {...blog}
                  onDeleteClick={() => {
                    setDeleteBlogId(blog._id);
                    setOpenDeleteModal(true);
                  }}
                  onEditClick={() => {
                    setEditBlogId(blog._id);
                    setOpenEditModal(true);
                  }}
                />
              ))
            ) : (
              <div>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  No blogs yet...
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl sm:px-16 xl:px-48">
                  In order to see blogs you can create some. Don't hesitate to
                  do it!
                </p>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 dark:from-blue-400 dark:to-teal-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-blue-500"
                >
                  Create
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
