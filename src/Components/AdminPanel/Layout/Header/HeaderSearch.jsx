import { Search } from "lucide-react";
import styles from "./Header.module.css";

const HeaderSearch = () => (
  <div className={styles.searchContainer}>
    <Search size={18} className={styles.searchIcon} />
    <input type="text" placeholder="ابحث هنا..." className={styles.searchInput} />
  </div>
);

export default HeaderSearch;
