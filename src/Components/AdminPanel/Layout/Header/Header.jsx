import { Search, Bell, Settings, LogOut, PanelRight, Plus, Clock } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../../utils/context";
import { useCycles } from "../../Cycles/Context/CycleContext";
import supabase from "../../../../utils/supabase";
import styles from "./Header.module.css";

const Header = ({ onMobileMenuOpen }) => {
  const session = useContext(SessionContext);
  const user = session?.user;
  const navigate = useNavigate();
  const { openNewModal } = useCycles();
  const signOut = async () => await supabase.auth.signOut();

  const avatarUrl = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  return (
    <header className={styles.header}>
      {/* Mobile trigger */}
      <button className={styles.mobileMenuBtn} onClick={onMobileMenuOpen} aria-label="القائمة">
        <PanelRight size={22} />
      </button>

      {/* Search */}
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="ابحث هنا..." className={styles.searchInput} />
      </div>

      {/* Cycle action buttons */}
      <div className={styles.cycleActions}>
        <button className={styles.prevCyclesBtn} onClick={() => navigate('/cycles')} title="الدورات السابقة">
          <Clock size={16} />
          <span>الدورات السابقة</span>
        </button>
        <button className={styles.newCycleBtn} onClick={openNewModal} title="دورة جديدة">
          <Plus size={16} />
          <span>دورة جديدة</span>
        </button>
      </div>

      {/* Right actions */}
      <div className={styles.actionsContainer}>
        <button className={styles.iconBtn} aria-label="Notifications"><Bell size={20} /></button>
        <button className={`${styles.iconBtn} ${styles.desktopOnlyBtn}`} aria-label="Settings"><Settings size={20} /></button>
        <button className={`${styles.iconBtn} ${styles.desktopOnlyBtn}`} onClick={signOut} aria-label="تسجيل الخروج"><LogOut size={20} /></button>
        <div className={styles.userProfile}>
          <img src={avatarUrl} alt="Profile" className={styles.avatar} />
          <span className={styles.userName}>{user?.user_metadata?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
