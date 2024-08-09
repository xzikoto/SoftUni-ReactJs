import { useEffect, useState } from "react";
import blogsAPI from "../api/blogs-api";

export function useGetAllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const result = await blogsAPI.getAll();
      setBlogs(result);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return [blogs, fetchBlogs];
}

export function useGetOneBlog(blogId) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!blogId) return;

    (async () => {
      try {
        const result = await blogsAPI.get(blogId);
        setBlog(result);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    })();
  }, [blogId]);

  return [blog, setBlog];
}

export function useCreateBlog() {
  const blogCreateHandler = (blogData) => blogsAPI.create(blogData);

  return blogCreateHandler;
}

export function useEditBlog() {
  const blogEditHandler = (id, data) => blogsAPI.put(id, data);

  return blogEditHandler;
}
