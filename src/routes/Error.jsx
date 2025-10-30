import { Link } from "react-router-dom";
import styles from "../styles/Error.module.css";

const Error = () => (
  <main className={styles.container}>
    <div className={styles.text}>
      <p className={styles.status}>404</p>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.subheading}>
        Sorry, we couldn't find the page you were looking for.
      </p>
      <div className={styles.actions}>
        <Link to="/" className={styles.link}>
          Go back home
        </Link>
      </div>
    </div>
  </main>
);

export default Error;
