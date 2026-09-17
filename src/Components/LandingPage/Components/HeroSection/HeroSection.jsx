import styles from "./HeroSection.module.css";
const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.leftSection}>
        <img src="HeroImg.png" alt="hero" className={styles.heroImg}></img>
      </div>
      <div className={styles.rightSection}>
        <h1>أهلا بك في برنامج ادارة المزارع</h1>
        <h2>
          متابعة دورات الدواجن يوما بيوم ومعرفة جميع المشاكل والاحصائيات خلال كل
          دوره
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
