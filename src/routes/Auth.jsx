import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "../hooks/useMutation";
import { useToken } from "../hooks/useToken";
import { createUser, generateToken } from "../lib/BlogService";
import Input from "../components/Input";
import ErrorAlert from "../components/ErrorAlert";
import styles from "../styles/Auth.module.css";

const signInFields = [
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const signUpFields = [
  { label: "Display Name", name: "name", type: "text" },
  ...signInFields,
  { label: "Confirm Password", name: "passwordConfirmation", type: "password" },
];

const initialSignInData = {
  email: "",
  password: "",
};

const initialSignUpData = {
  name: "",
  ...initialSignInData,
  passwordConfirmation: "",
};

const Auth = ({ isSignUp }) => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const [formData, setFormData] = useState(
    isSignUp ? initialSignUpData : initialSignInData,
  );

  const { mutate, error, isLoading } = useMutation({
    mutationFn: isSignUp ? createUser : generateToken,
    onSuccess: (data) => {
      if (!data.token) {
        return navigate("/sign-in");
      }
      setToken(data.token);
      navigate("/");
    },
  });

  const fields = isSignUp ? signUpFields : signInFields;

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
      <h1 className={styles.heading}>{isSignUp ? "Sign up" : "Sign in"}</h1>

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
            {isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        {isSignUp ? (
          <p className={styles.message}>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        ) : (
          <p className={styles.message}>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default Auth;
