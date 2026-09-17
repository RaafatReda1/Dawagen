import SigninGoogleBtn from "../../../../Auth/SigninGoogleBtn";
import styles from "./LandingHeader.module.css";
const LandingHeader = () => {
  return (
    <header className={styles.landingHeader}>
      <div className={styles.leftHeaderSection}>
        <img src="logo.png" alt="logo" className={styles.landingLogo}></img>
        <SigninGoogleBtn />
      </div>

      <div className={styles.rightHeaderSection}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </header>
  );
};

export default LandingHeader;
