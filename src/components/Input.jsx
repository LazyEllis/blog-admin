import styles from "../styles/Input.module.css";

const Input = ({ label, type, name, value, onChange }) => (
  <div className={styles.container}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
      className={styles.input}
    />
  </div>
);

export default Input;
