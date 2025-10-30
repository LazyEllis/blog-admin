import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "../hooks/useMutation";
import { createPostComment } from "../lib/BlogService";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import ErrorAlert from "./ErrorAlert";
import Loader from "./Loader";
import styles from "../styles/CommentSection.module.css";

const CommentSection = ({
  comments,
  error,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
  className,
}) => {
  const { id } = useParams();

  const [selectedCommentStatus, setSelectedCommentStatus] = useState({
    id: null,
    status: null,
  });

  const handleCancel = () => {
    setSelectedCommentStatus({ id: null, status: null });
  };

  const createComment = useMutation({
    mutationFn: createPostComment,
  });

  const handleCreate = (content, onReset) => {
    createComment.mutate(
      { postId: id, commentData: { content } },
      {
        onSuccess: (comment) => {
          onCreate(comment);
          onReset();
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className={`${className} ${styles.centered}`}>
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div className={className}>
        <ErrorAlert error={error} />
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className={styles.heading}>
        {comments.length === 0
          ? "No Comments yet"
          : `Comments (${comments.length})`}
      </h2>

      <CommentForm
        mutate={handleCreate}
        error={createComment.error}
        isLoading={createComment.isLoading}
        className={styles.form}
      />

      <div className={comments.length > 0 ? styles.comments : null}>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            onSelectUpdate={() =>
              setSelectedCommentStatus({ id: comment.id, status: "updating" })
            }
            onSelectDelete={() =>
              setSelectedCommentStatus({ id: comment.id, status: "deleting" })
            }
            onCancel={handleCancel}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isUpdating={
              selectedCommentStatus.id === comment.id &&
              selectedCommentStatus.status === "updating"
            }
            isDeleting={
              selectedCommentStatus.id === comment.id &&
              selectedCommentStatus.status === "deleting"
            }
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
