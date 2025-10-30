import { CircleX } from "lucide-react";
import { classNames } from "../lib/utils";
import Alert from "./Alert";
import styles from "../styles/ErrorAlert.module.css";

const ErrorAlert = ({ error, className, isRouteError }) => (
  <Alert
    className={classNames(
      styles.alert,
      isRouteError ? styles.routeError : null,
      className,
    )}
  >
    <div className={styles.iconContainer}>
      <CircleX size={20} />
    </div>
    <div>
      {Array.isArray(error) ? (
        <>
          <p className={styles.heading}>
            {error.length === 1
              ? "There is an error in your submission"
              : `There are ${error.length} errors in your submission`}
          </p>
          <ul className={styles.errorList}>
            {error.map((err, index) => (
              <li key={index}>{err.msg}</li>
            ))}
          </ul>
        </>
      ) : (
        <span className={styles.message}>{error.message}</span>
      )}
    </div>
  </Alert>
);

export default ErrorAlert;
