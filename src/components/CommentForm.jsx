import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import styles from "../styles/CommentForm.module.css";

const CommentForm = ({
  mutate,
  error,
  isLoading,
  comment,
  onCancel,
  className,
}) => {
  const [content, setContent] = useState(comment?.content || "");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleReset = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    comment ? mutate(content) : mutate(content, handleReset);
  };

  return (
    <div className={className}>
      {error && <ErrorAlert className={styles.error} error={error} />}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textareaContainer}>
          <label
            htmlFor={comment ? "comment-edit" : "comment-create"}
            className="sr-only"
          >
            {comment ? "Edit this comment" : "Send a comment"}
          </label>
          <textarea
            name="content"
            id={comment ? "comment-edit" : "comment-create"}
            value={content}
            rows={3}
            placeholder="What are your thoughts?"
            required
            onChange={handleChange}
            className={styles.textarea}
          />
          <div aria-hidden="true" className={styles.spacer}>
            <div className={styles.spacerOuter}>
              <div className={styles.spacerInner}></div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel || handleReset}
            className={styles.button}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {comment ? "Edit" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
