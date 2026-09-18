import { Search, Bell, Settings, Moon, LogOut } from "lucide-react";
import styles from "./Header.module.css";
import { useContext } from "react";
import { SessionContext } from "../../../../utils/context";
import supabase from "../../../../utils/supabase";

const Header = () => {
  const session = useContext(SessionContext);
  const user = session?.user;

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="ابحث هنا..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actionsContainer}>
        <button
          className={styles.iconBtn}
          onClick={signOut}
          aria-label="Sign Out"
        >
          <LogOut size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <Settings size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Dark Mode">
          <Moon size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className={styles.userProfile}>
          <span className={styles.userName}>{user?.user_metadata?.name}</span>
          <img
            src={
              user?.user_metadata?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.user_metadata?.name || "User",
              )}&background=1F6E56&color=fff&rounded=true`
            }
            alt="Profile"
            className={styles.avatar}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
