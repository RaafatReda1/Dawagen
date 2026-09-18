import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, Users, FileText, Calendar, Wallet } from "lucide-react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navItems = [
    { path: "/", icon: <LayoutDashboard size={24} />, label: "الرئيسية" },
    { path: "/cycles", icon: <Calendar size={24} />, label: "الدورات" },
    { path: "/finances", icon: <Wallet size={24} />, label: "المالية" },
    { path: "/reports", icon: <FileText size={24} />, label: "التقارير" },
    { path: "/users", icon: <Users size={24} />, label: "المستخدمين" },
    { path: "/settings", icon: <Settings size={24} />, label: "الإعدادات" },
  ];

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarCurve}>
        <div className={styles.logoContainer}>
          <img src="logo.png" alt="Dawagen" className={styles.logo} />
        </div>
        
        <nav className={styles.navContainer}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              title={item.label}
            >
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
