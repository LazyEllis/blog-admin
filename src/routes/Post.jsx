import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { getPost, getPostComments } from "../lib/BlogService";
import CommentSection from "../components/CommentSection";
import Badge from "../components/Badge";
import ErrorAlert from "../components/ErrorAlert";
import Loader from "../components/Loader";
import styles from "../styles/Post.module.css";

const Post = () => {
  const { id } = useParams();
  const {
    data: post,
    error: postError,
    isLoading: isLoadingPost,
  } = useQuery({ queryFn: () => getPost(id) });
  const {
    data: comments,
    error: commentsError,
    isLoading: areCommentsLoading,
    setData: setComments,
  } = useQuery({ queryFn: () => getPostComments(id) });

  const handleCommentCreate = (comment) => {
    setComments([comment, ...comments]);
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    );
  };

  const handleCommentDelete = (deletedComment) => {
    setComments(comments.filter((comment) => comment.id !== deletedComment.id));
  };

  if (isLoadingPost) return <Loader isRouteLoader={true} />;

  if (postError) return <ErrorAlert error={postError} isRouteError={true} />;

  return (
    <>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.metadata}>
            <Badge variant={post.isPublished ? "success" : "warning"}>
              {post.isPublished ? "PUBLISHED" : "UNPUBLISHED"}
            </Badge>
            <div>{format(post.createdAt, "MMM d, y")}</div>
          </div>
        </header>
        <p>{post.content}</p>
      </article>
      <CommentSection
        className={styles.comments}
        comments={comments}
        error={commentsError}
        isLoading={areCommentsLoading}
        onCreate={handleCommentCreate}
        onUpdate={handleCommentUpdate}
        onDelete={handleCommentDelete}
      />
    </>
  );
};

export default Post;
