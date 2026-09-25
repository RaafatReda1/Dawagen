import { useContext } from "react";
import { LogOut } from "lucide-react";
import { SessionContext } from "../../../../utils/context";
import supabase from "../../../../utils/supabase";
import styles from "./Sidebar.module.css";

const SidebarUserFooter = ({ isDrawer = false, collapsed = false }) => {
  const session = useContext(SessionContext);
  const user = session?.user;
  const avatar = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  const handleSignOut = () => supabase.auth.signOut();

  if (isDrawer) {
    return (
      <div className={styles.drawerFooter}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
        <div className={styles.drawerUser}>
          <span className={styles.drawerName}>{user?.user_metadata?.name || "المستخدم"}</span>
          <span className={styles.drawerEmail}>{user?.email}</span>
        </div>
        <button className={styles.signOut} onClick={handleSignOut} title="تسجيل الخروج">
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.footer} ${collapsed ? styles.footerCollapsed : ""}`}>
      <img src={avatar} alt="avatar" className={styles.avatar} title={user?.user_metadata?.name} />
      {!collapsed && (
        <button className={styles.signOut} onClick={handleSignOut} title="تسجيل الخروج">
          <LogOut size={18} />
        </button>
      )}
    </div>
  );
};

export default SidebarUserFooter;
