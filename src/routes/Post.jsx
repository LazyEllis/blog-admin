import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { useMutation } from "../hooks/useMutation";
import { getPost, getPostComments, deletePost } from "../lib/BlogService";
import { Menu, MenuButton, MenuItems, MenuItem } from "../components/Dropdown";
import parse from "html-react-parser";
import CommentSection from "../components/CommentSection";
import Badge from "../components/Badge";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ErrorAlert from "../components/ErrorAlert";
import Loader from "../components/Loader";
import styles from "../styles/Post.module.css";

const Post = () => {
  const navigate = useNavigate();
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

  const [isDeleting, setIsDeleting] = useState(false);

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  const handleOpen = () => {
    setIsDeleting(true);
  };

  const handleClose = () => {
    setIsDeleting(false);
  };

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
          <div className={styles.titleStrip}>
            <h1 className={styles.title}>{post.title}</h1>
            <Menu>
              <MenuButton>
                <span className="sr-only">Open post actions</span>
                <Ellipsis />
              </MenuButton>
              <MenuItems>
                <MenuItem>
                  <Link className={styles.action} to={`/posts/${post.id}/edit`}>
                    Edit
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button className={styles.delete} onClick={handleOpen}>
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className={styles.metadata}>
            <Badge variant={post.isPublished ? "success" : "warning"}>
              {post.isPublished ? "PUBLISHED" : "UNPUBLISHED"}
            </Badge>
            <div>{format(post.createdAt, "MMM d, y")}</div>
          </div>
        </header>
        <div className={styles.content}>{parse(post.content)}</div>
      </article>
      {isDeleting && (
        <DeleteConfirmation
          resource="post"
          onClose={handleClose}
          onDelete={handleDelete}
          error={mutation.error}
          isLoading={mutation.isLoading}
        />
      )}
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
