import { Link, Outlet, Navigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../lib/BlogService";
import styles from "../styles/Layout.module.css";
import NavMenu from "../components/NavMenu";

const Layout = () => {
  const { logout } = useAuth();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: getProfile,
    onError: (error) => {
      if (error.message === "Unauthorized") logout();
    },
  });

  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.brand}>
            Good Vibrations
          </Link>

          <NavMenu user={user} isLoading={isLoading} error={error} />
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet context={{ user }} />
      </main>
    </>
  );
};

export default Layout;
