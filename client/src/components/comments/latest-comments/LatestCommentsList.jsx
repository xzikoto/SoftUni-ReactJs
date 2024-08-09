import { useEffect } from "react";
import { useGetMostLikedComments } from "../../../hooks/useComments";
import LatestCommentsListItem from "./latest-comments-list-item/LatestCommentsListItem";

export default function LatestCommentsList() {
  const [comments, setComments] = useGetMostLikedComments();
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-6">
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <LatestCommentsListItem key={comment._id} {...comment} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No comments available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
