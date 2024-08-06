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

      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              From the blog
            </h2>
            <div className="flex items-center mt-4">
              <div className="flex-grow pr-4">
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Easiest way to grow your audience with our incredible user
                  experience.
                </p>
              </div>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create
              </button>
            </div>
          </div>

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
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
