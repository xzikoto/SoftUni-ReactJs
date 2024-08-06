import { useEffect, useState } from "react";
import blogsAPI from "../../../api/blogs-api";

const withBlogData = (WrappedComponent) => {
  return function BlogDataWrapper({ id, ...props }) {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (id) {
        const fetchBlog = async () => {
          try {
            const blogData = await blogsAPI.get(id);
            setBlog(blogData);
          } catch (err) {
            setError(err);
          }
        };

        fetchBlog();
      }
    }, [id]);

    if (error) return <p>Error loading blog data</p>;
    if (!blog) return null;

    return <WrappedComponent blog={blog} {...props} />;
  };
};

export default withBlogData;
