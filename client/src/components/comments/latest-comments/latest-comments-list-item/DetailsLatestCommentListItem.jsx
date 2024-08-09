import { Link, useParams } from "react-router-dom";
import { Card, Spinner } from "flowbite-react";
import { useGetOnecomment } from "../../../../hooks/useComments";

export default function DetailsLatestCommentListItem() {
  const { commentId } = useParams();
  const [comment] = useGetOnecomment(commentId);

  return (
    <>
      {comment ? (
        <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Comment By: {comment._ownerId}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {comment.text}
            </p>
            <Link
              to={`/blogs/${comment.postId}/details`}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Check Blog
            </Link>
          </Card>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
}
