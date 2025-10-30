import { Link, Outlet } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useToken } from "../hooks/useToken";
import { getProfile } from "../lib/BlogService";
import styles from "../styles/Layout.module.css";
import NavMenu from "../components/NavMenu";

const Layout = () => {
  const { token, setToken } = useToken();

  const handleSignOut = () => setToken(null);

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: getProfile,
    enabled: !!token,
    onError: (error) => {
      if (error.message === "Unauthorized") handleSignOut();
    },
  });

  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.brand}>
            Good Vibrations
          </Link>

          <NavMenu
            user={user}
            isLoading={isLoading}
            error={error}
            onSignOut={handleSignOut}
          />
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet context={{ user }} />
      </main>
    </>
  );
};

export default Layout;
