import { CircleUser } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "./Dropdown";
import Loader from "./Loader";
import styles from "../styles/NavMenu.module.css";

const NavMenu = ({ user, error, isLoading }) => {
  const { logout } = useAuth();

  if (isLoading || error) return <Loader />;

  if (!user.isAdmin) logout();

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
          <button onClick={logout} className={styles.dropdownLink}>
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavMenu;
