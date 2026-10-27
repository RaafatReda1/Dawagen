import styles from "./SummaryMetricCard.module.css";

const SummaryMetricCard = ({ title, value, unit, subtitle, color = "default" }) => (
  <div className={`${styles.card} ${styles[color]}`}>
    <span className={styles.title}>{title}</span>
    <div className={styles.valueRow}>
      <span className={styles.value}>{value}</span>
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
  </div>
);

export default SummaryMetricCard;
