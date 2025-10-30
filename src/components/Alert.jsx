import { classNames } from "../lib/utils";
import styles from "../styles/Alert.module.css";

const Alert = ({ className, children }) => (
  <div className={classNames(className, styles.alert)}>{children}</div>
);

export default Alert;
