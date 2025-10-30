import { Link } from "react-router-dom";
import { CircleUser, Menu as Hamburger } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "./Dropdown";
import Loader from "./Loader";
import styles from "../styles/NavMenu.module.css";

const NavMenu = ({ user, error, isLoading, onSignOut }) => {
  if (isLoading || error) return <Loader />;

  if (!user)
    return (
      <>
        <ul className={styles.navList}>
          <li>
            <Link to="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link to="/sign-up" className={styles.button}>
              Sign up
            </Link>
          </li>
        </ul>

        <Menu className={styles.hamburger}>
          <MenuButton>
            <span className="sr-only">Open navigation menu</span>
            <Hamburger size={24} />
          </MenuButton>

          <MenuItems>
            <MenuItem>
              <Link to="/sign-in" className={styles.dropdownLink}>
                Sign in
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/sign-up" className={styles.actionLink}>
                Sign up
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </>
    );

  return (
    <Menu>
      <MenuButton>
        <span className="sr-only">Open user menu</span>
        <CircleUser size={32} />
      </MenuButton>

      <MenuItems>
        <MenuItem>
          <div>{user.name}</div>
        </MenuItem>
        <MenuItem>
          <button onClick={onSignOut} className={styles.dropdownLink}>
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavMenu;
