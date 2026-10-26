import styles from "./FeedStatCard.module.css";

const FeedStatCard = ({ label, sacks, tons, icon, badge }) => (
  <div className={styles.card}>
    <div className={styles.cardTop}>
      <span className={styles.label}>{label}</span>
      {icon}
    </div>
    <div className={styles.valRow}>
      <span className={styles.mainVal}>{sacks.toLocaleString()}</span>
      <span className={styles.unit}>شيكارة</span>
    </div>
    <div className={styles.cardBottom}>
      <span className={styles.weight}>{tons} طن</span>
      <span className={styles.badge}>{badge}</span>
    </div>
  </div>
);

export default FeedStatCard;
