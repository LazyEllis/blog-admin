import { useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import styles from "../styles/Dialog.module.css";

const Dialog = ({ onClose, children }) => {
  const panelRef = useRef(null);
  useOutsideClick(panelRef, onClose);

  return (
    <dialog className={styles.dialog} open>
      <div className={styles.backdrop}></div>

      <div className={styles.panelOuter}>
        <div className={styles.panelInner}>
          <div className={styles.panel} ref={panelRef}>
            {children}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
