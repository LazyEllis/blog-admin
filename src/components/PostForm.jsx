import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "../hooks/useMutation";
import { createPost, editPost } from "../lib/BlogService";
import ErrorAlert from "../components/ErrorAlert";
import styles from "../styles/PostForm.module.css";

const PostForm = ({ postData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(
    postData ?? {
      title: "",
      content: "",
      isPublished: false,
    },
  );

  const { mutate, error, isLoading } = useMutation({
    mutationFn: !id ? createPost : editPost,
    onSuccess: (post) => {
      navigate(`/posts/${post.id}`);
    },
  });

  const handleValueChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(!id ? post : { postId: id, postData: post });
  };

  return (
    <div className={styles.formContainer}>
      {error && <ErrorAlert error={error} className={styles.error} />}

      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={post.title}
            onChange={handleValueChange}
            className={styles.formControl}
            required
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="content" className={styles.label}>
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={post.content}
            onChange={handleValueChange}
            className={styles.formControl}
            rows={3}
            required
          />
        </div>

        <div className={`${styles.formSection} ${styles.toggleSection}`}>
          <label htmlFor="isPublished">Published?</label>
          <div className={styles.toggle}>
            <span className={styles.slider}></span>
            <input
              type="checkbox"
              name="isPublished"
              id="isPublished"
              checked={post.isPublished}
              onChange={handleCheckChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {post.isPublished ? "Publish" : "Save As Draft"}
        </button>
      </form>
    </div>
  );
};
export default PostForm;
