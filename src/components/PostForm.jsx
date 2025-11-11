import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "../hooks/useMutation";
import { createPost, editPost } from "../lib/BlogService";
import ErrorAlert from "../components/ErrorAlert";
import styles from "../styles/PostForm.module.css";

const PostForm = ({ postData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const [title, setTitle] = useState(postData.title ?? "");
  const [isPublished, setIsPublished] = useState(postData.isPublished ?? false);

  const { mutate, error, isLoading } = useMutation({
    mutationFn: !id ? createPost : editPost,
    onSuccess: (post) => {
      navigate(`/posts/${post.id}`);
    },
  });

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheck = (e) => {
    setIsPublished(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title,
      content: editorRef.current?.getContent(),
      isPublished,
    };
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
            value={title}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>

        <div className={styles.formSection}>
          <label
            htmlFor="content"
            className={`${styles.label} ${styles.editorLabel}`}
          >
            Content
          </label>

          <Editor
            id="content"
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={postData.content ?? ""}
            init={{
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
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
              checked={isPublished}
              onChange={handleCheck}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isPublished ? "Publish" : "Save As Draft"}
        </button>
      </form>
    </div>
  );
};
export default PostForm;
