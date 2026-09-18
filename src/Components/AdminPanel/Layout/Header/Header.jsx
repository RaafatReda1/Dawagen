import { Search, Bell, Settings, Moon, LogOut, PanelRight } from "lucide-react";
import { useContext } from "react";
import { SessionContext } from "../../../../utils/context";
import supabase from "../../../../utils/supabase";
import styles from "./Header.module.css";

const Header = ({ onMobileMenuOpen }) => {
  const session = useContext(SessionContext);
  const user = session?.user;
  const signOut = async () => await supabase.auth.signOut();

  const avatarUrl = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  return (
    <header className={styles.header}>
      {/* Mobile menu trigger — only visible on small screens */}
      <button className={styles.mobileMenuBtn} onClick={onMobileMenuOpen} aria-label="فتح القائمة">
        <PanelRight size={22} />
      </button>

      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="ابحث هنا..." className={styles.searchInput} />
      </div>

      <div className={styles.actionsContainer}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <Settings size={20} />
        </button>
        <button className={styles.iconBtn} onClick={signOut} aria-label="تسجيل الخروج">
          <LogOut size={20} />
        </button>

        <div className={styles.userProfile}>
          <img src={avatarUrl} alt="Profile" className={styles.avatar} />
          <span className={styles.userName}>{user?.user_metadata?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
