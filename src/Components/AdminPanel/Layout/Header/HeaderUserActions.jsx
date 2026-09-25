import { useContext } from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { SessionContext } from "../../../../utils/context";
import supabase from "../../../../utils/supabase";
import styles from "./Header.module.css";

const HeaderUserActions = () => {
  const session = useContext(SessionContext);
  const user = session?.user;
  const avatarUrl = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  return (
    <div className={styles.actionsContainer}>
      <button className={styles.iconBtn} aria-label="Notifications"><Bell size={20} /></button>
      <button className={`${styles.iconBtn} ${styles.desktopOnlyBtn}`} aria-label="Settings"><Settings size={20} /></button>
      <button className={`${styles.iconBtn} ${styles.desktopOnlyBtn}`} onClick={() => supabase.auth.signOut()} aria-label="تسجيل الخروج"><LogOut size={20} /></button>
      <div className={styles.userProfile}>
        <img src={avatarUrl} alt="Profile" className={styles.avatar} />
        <span className={styles.userName}>{user?.user_metadata?.name}</span>
      </div>
    </div>
  );
};

export default HeaderUserActions;
