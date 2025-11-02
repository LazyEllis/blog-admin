import { TriangleAlert } from "lucide-react";
import Dialog from "./Dialog";
import ErrorAlert from "./ErrorAlert";
import styles from "../styles/DeleteConfirmation.module.css";

const DeleteConfirmation = ({
  resource,
  onClose,
  onDelete,
  error,
  isLoading,
}) => (
  <Dialog onClose={onClose}>
    <div className={styles.dialogBody}>
      <div className={styles.alertIconContainer}>
        <TriangleAlert size={24} />
      </div>
      <div className={styles.dialogText}>
        <h3 className={styles.dialogTitle}>Delete {resource}</h3>

        <p className={styles.dialogMessage}>
          Are you sure you want to delete this {resource}? This action cannot be
          undone.
        </p>

        {error && <ErrorAlert error={error} className={styles.error} />}
      </div>
    </div>

    <div className={styles.dialogActions}>
      <button
        onClick={onDelete}
        disabled={isLoading}
        className={`${styles.button} ${styles.danger}`}
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className={`${styles.button} ${styles.neutral}`}
      >
        Cancel
      </button>
    </div>
  </Dialog>
);

export default DeleteConfirmation;
