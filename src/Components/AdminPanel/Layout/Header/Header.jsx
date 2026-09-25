import { PanelRight } from "lucide-react";
import HeaderSearch from "./HeaderSearch";
import HeaderUserActions from "./HeaderUserActions";
import styles from "./Header.module.css";

const Header = ({ onMobileMenuOpen }) => {
  return (
    <header className={styles.header}>
      <button className={styles.mobileMenuBtn} onClick={onMobileMenuOpen} aria-label="القائمة">
        <PanelRight size={22} />
      </button>
      <HeaderSearch />
      <HeaderUserActions />
    </header>
  );
};

export default Header;
