import { Link } from "react-router-dom";
import { MessageCircle, Ellipsis } from "lucide-react";
import { format } from "date-fns";
import { useMutation } from "../hooks/useMutation";
import { deletePost } from "../lib/BlogService";
import { Menu, MenuButton, MenuItems, MenuItem } from "../components/Dropdown";
import DeleteConfirmation from "./DeleteConfirmation";
import styles from "../styles/PostItem.module.css";

const Post = ({ post, isSelected, onSelect, onDelete, onCancel }) => {
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      onDelete(post);
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(post.id);
  };

  return (
    <>
      <article className={styles.post}>
        <div>
          <div className={styles.postHeader}>
            <Link to={`/posts/${post.id}`}>
              <h2 className={styles.postTitle}>{post.title}</h2>
            </Link>
            <Menu>
              <MenuButton>
                <span className="sr-only">Open post actions</span>
                <Ellipsis />
              </MenuButton>

              <MenuItems>
                <MenuItem>
                  <button className={styles.delete} onClick={onSelect}>
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className={styles.metadata}>
            <div>{format(post.createdAt, "MMM d, y")}</div>
            <div className={styles.iconData}>
              <MessageCircle size={16} /> {post._count.comments}
            </div>
          </div>
        </div>
      </article>
      {isSelected && (
        <DeleteConfirmation
          resource="post"
          onClose={onCancel}
          onDelete={handleDelete}
          error={deletePostMutation.error}
          isLoading={deletePostMutation.isLoading}
        />
      )}
    </>
  );
};
export default Post;
