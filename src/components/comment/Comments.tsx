import { AddComment, Comment } from "@/api";
import { CommentFormType, CommentsForm, CommentsList } from "@/components";
import { ModuleTitles } from "@/enum";
import { useGetReviews } from "@/hooks/useGetReviews";
import { generateReviewURL } from "@/lib";
import React, { useEffect, useState } from "react";

interface CommentsProps {
  type: ModuleTitles;
  slug: string;
  id: number;
  total: number;
}

export function CommentsArea({ type, slug, id, total }: CommentsProps) {
  const [Ttotal, setTotal] = useState<number>(total || 0);
  const [page, setPage] = useState<number>(1);
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<Comment | null>(null);
  const pathname = generateReviewURL(type, id);
  const { data: comments, isLoading: isLoadingReviews } = useGetReviews(
    slug,
    type,
    {
      page,
      perPage: 3,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  );

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFormSubmit = async (data: CommentFormType) => {
    try {
      if (pathname) {
        const userCommentUpdated = await AddComment(data.text, pathname);
        setUserComment(userCommentUpdated);
        setTotal((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    if (comments?.items) {
      console.log("here")
      console.log(comments)
      if (comments?.currentUser) setUserComment(comments.currentUser);
      setCommentsData((prevCommentsData) => [
        ...prevCommentsData,
        ...comments.items,
      ]);
    }
  }, [comments]);

  useEffect(() => {
    return () => {
      setCommentsData([]);
    };
  }, [slug]);

  return (
    <div className="relative">
      <CommentsForm isDisabled={!!userComment} onSubmit={handleFormSubmit} />
      <CommentsList
        setUserComment={setUserComment}
        userComment={userComment}
        isLoading={isLoadingReviews}
        total={Ttotal}
        setTotal={setTotal}
        data={commentsData}
        onLoadMore={handleLoadMoreClick}
        showLoadMore={commentsData.length < (comments?.meta?.totalItems || 0)}
        pathname={pathname}
      />
    </div>
  );
}
