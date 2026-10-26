import styles from "./DrugStatCard.module.css";

const DrugStatCard = ({ label, value, unit, icon, badge }) => (
  <div className={styles.card}>
    <div className={styles.cardTop}>
      <span className={styles.label}>{label}</span>
      {icon}
    </div>
    <div className={styles.valRow}>
      <span className={styles.mainVal}>{value}</span>
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
    <div className={styles.cardBottom}>
      <span className={styles.badge}>{badge}</span>
    </div>
  </div>
);

export default DrugStatCard;
