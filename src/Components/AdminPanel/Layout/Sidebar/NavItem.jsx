import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import styles from "./Sidebar.module.css";

const NavItem = ({ path, icon: Icon, label, onClick, badge, collapsed }) => {
  const { pathname } = useLocation();
  const isActive = pathname === path || (path === "/current-cycle" && pathname === "/");

  return (
    <NavLink
      to={path}
      title={label}
      onClick={onClick}
      onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "back.out(2)" })}
      onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power3.out" })}
      className={`${styles.navItem} ${isActive ? styles.active : ""} ${collapsed ? styles.navItemCollapsed : ""}`}
    >
      <div className={styles.iconWrapper}>
        <Icon size={20} strokeWidth={2} />
        {badge && <span className={styles.itemBadge}>{badge}</span>}
      </div>
      {!collapsed && <span className={styles.navLabel}>{label}</span>}
    </NavLink>
  );
};

export default NavItem;
