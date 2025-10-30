import { LoaderCircle } from "lucide-react";
import { classNames } from "../lib/utils";
import styles from "../styles/Loader.module.css";

const Loader = ({ isRouteLoader }) => (
  <LoaderCircle
    className={classNames(styles.spin, isRouteLoader ? styles.centered : null)}
  />
);

export default Loader;
