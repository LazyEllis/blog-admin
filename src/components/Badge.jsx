import { classNames } from "../lib/utils";
import styles from "../styles/Badge.module.css";

const Badge = ({ variant, children }) => (
  <span className={classNames(styles.badge, variant ? styles[variant] : null)}>
    {children}
  </span>
);

export default Badge;
