import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import SigninGoogleBtn from "../../../../Auth/SigninGoogleBtn";
import styles from "./LandingHeader.module.css";

const LandingHeader = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={styles.landingHeader}>
      <div className={styles.leftHeaderSection}>
        <img src="logo.png" alt="logo" className={styles.landingLogo}></img>
        <div className={styles.headerActions}>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <SigninGoogleBtn />
        </div>
      </div>

      <div className={styles.rightHeaderSection}>
        <a href="#home" className={styles.navLink}>الرئيسية</a>
        <a href="#features" className={styles.navLink}>المميزات</a>
        <a href="#contact" className={styles.navLink}>تواصل معنا</a>
      </div>
    </header>
  );
};

export default LandingHeader;
