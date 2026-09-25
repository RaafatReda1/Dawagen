import NavItem from "./NavItem";
import styles from "./Sidebar.module.css";

const NavSection = ({ title, items, onItemClick, collapsed }) => (
  <div className={styles.section}>
    {title && !collapsed && <div className={styles.sectionHeader}>{title}</div>}
    <div className={styles.sectionList}>
      {items.map((item) => (
        <NavItem key={item.path} {...item} onClick={onItemClick} collapsed={collapsed} />
      ))}
    </div>
  </div>
);

export default NavSection;
