import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "../hooks/useMutation";
import { useToken } from "../hooks/useToken";
import { generateToken } from "../lib/BlogService";
import Input from "../components/Input";
import ErrorAlert from "../components/ErrorAlert";
import styles from "../styles/Auth.module.css";

const fields = [
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const Auth = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { mutate, error, isLoading } = useMutation({
    mutationFn: generateToken,
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Sign in</h1>

      <div className={styles.formContainer}>
        {error && <ErrorAlert error={error} className={styles.error} />}

        <form onSubmit={handleSubmit}>
          {fields.map(({ label, name, type }) => (
            <Input
              key={name}
              label={label}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
            />
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
