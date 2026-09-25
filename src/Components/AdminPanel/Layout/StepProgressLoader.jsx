import styles from "./StepProgressLoader.module.css";

const StepProgressLoader = ({ currentStep = 1, totalSteps = 3, stepMessage = "جاري معالجة البيانات...", progress = null }) => {
  const percent = progress !== null ? progress : Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderCard}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinnerGlow} />
          <div className={styles.spinner} />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.stepTitle}>{stepMessage}</div>
          <div className={styles.stepSub}>الخطوة {currentStep} من {totalSteps}</div>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
          </div>
          <span className={styles.percentText}>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default StepProgressLoader;
