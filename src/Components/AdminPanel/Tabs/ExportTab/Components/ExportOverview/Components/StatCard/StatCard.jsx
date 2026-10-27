import styles from "./StatCard.module.css";

const StatCard = ({ title, value, unit, subtitle, icon: Icon, color = "green" }) => (
  <div className={`${styles.card} ${styles[color] || ""}`}>
    <div className={styles.top}>
      <span className={styles.title}>{title}</span>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon size={18} />
        </div>
      )}
    </div>
    <div className={styles.valueRow}>
      <span className={styles.value}>{value}</span>
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
  </div>
);

export default StatCard;
