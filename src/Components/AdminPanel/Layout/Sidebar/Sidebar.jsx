import { useContext, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  CalendarDays, Wheat, Syringe, Calculator, LayoutDashboard, Newspaper, Settings, LogOut, Plus, Clock
} from "lucide-react";
import { SessionContext } from "../../../../utils/context";
import supabase from "../../../../utils/supabase";
import styles from "./Sidebar.module.css";

/* 
  Tabs discovered from MainApp.Excalidraw:
  - الدورة الحالية : shows the current active cycle, its days, and daily records
  - العلف   : feed management & shipment history
  - الادوية  : drugs dashboard + add a drug
  - الاعدادات: app settings

  Header buttons (not sidebar tabs):
  - دورة جديدة +
  - الدورات السابقة
*/
const NAV = [
  { path: "/",       icon: CalendarDays,    label: "الايام"                  },
  { path: "/feed",   icon: Wheat,           label: "العلف"                   },
  { path: "/drugs",  icon: Syringe,         label: "الادوية"                  },
  { path: "/export", icon: Calculator,      label: "حسابات يوم التصدير" },
  { path: "/overview",icon: LayoutDashboard,label: "نظرة عامة علي الدورة"    },
  { path: "/news",   icon: Newspaper,       label: "اخبار واحصائيات"          },
];

const NavItem = ({ path, icon: Icon, label, onClick }) => (
  <NavLink
    to={path} end={path === "/"} title={label} onClick={onClick}
    onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1,  duration: 0.2, ease: "back.out(2)" })}
    onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.2, ease: "power3.out" })}
    onMouseDown ={e => gsap.to(e.currentTarget, { scale: 0.93, duration: 0.1 })}
    onMouseUp  ={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.15 })}
    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
  >
    <Icon size={22} strokeWidth={2} />
    <span className={styles.navLabel}>{label}</span>
  </NavLink>
);

/* ── Desktop pill ─────────────────────────────── */
const DesktopSidebar = () => {
  const pillRef = useRef(null);
  const session = useContext(SessionContext);
  const user = session?.user;
  const avatar = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { opacity: 0, x: 30, scale: 0.9 },
      { opacity: 1, x: 0,  scale: 1, duration: 0.7, ease: "back.out(1.5)" }
    );
    gsap.fromTo(pillRef.current.querySelectorAll("a, button, img.logo"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className={styles.pill} ref={pillRef}>
      <img src="logo.png" alt="logo" className={styles.logo} />
      <nav className={styles.nav}>
        {NAV.map(n => <NavItem key={n.path} {...n} />)}
      </nav>
      <div className={styles.footer}>
        <img src={avatar} alt="avatar" className={styles.avatar} title={user?.user_metadata?.name} />
        <button className={styles.signOut} onClick={() => supabase.auth.signOut()} title="تسجيل الخروج">
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

/* ── Mobile drawer ────────────────────────────── */
const MobileSidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const user = session?.user;
  const avatar = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.name || "U")}&background=1F6E56&color=fff&rounded=true`;

  return (
    <>
      <div className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`} onClick={onMobileClose} />
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerInner}>
          <div className={styles.drawerLogo}>
            <img src="logo.png" alt="logo" className={styles.logo} />
            <span className={styles.brandName}>Dawagen</span>
          </div>

          <div className={styles.drawerQuickActions}>
            <button
              className={styles.drawerNewCycleBtn}
              onClick={() => { navigate('/cycles'); onMobileClose(); }}
            >
              <Plus size={18} />
              <span>دورة جديدة</span>
            </button>
            <button
              className={styles.drawerPrevCyclesBtn}
              onClick={() => { navigate('/cycles'); onMobileClose(); }}
            >
              <Clock size={18} />
              <span>الدورات السابقة</span>
            </button>
          </div>

          <nav className={styles.drawerNav}>
            {NAV.map(n => <NavItem key={n.path} {...n} onClick={onMobileClose} />)}
          </nav>

          <div className={styles.drawerDivider} />

          <div className={styles.drawerFooter}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            <div className={styles.drawerUser}>
              <span className={styles.drawerName}>{user?.user_metadata?.name}</span>
              <span className={styles.drawerEmail}>{user?.email}</span>
            </div>
            <button className={styles.signOut} onClick={() => supabase.auth.signOut()} title="تسجيل الخروج">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Sidebar = ({ mobile, mobileOpen, onMobileClose }) => {
  if (mobile) return <MobileSidebar mobileOpen={mobileOpen} onMobileClose={onMobileClose} />;
  return <DesktopSidebar />;
};

export default Sidebar;
