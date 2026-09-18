import styles from "./ActiveCycleCard.module.css";

const ActiveCycleCard = ({ cycle }) => {
  if (!cycle) return null;

  const startDate = cycle.started_at ? new Date(cycle.started_at).toLocaleDateString("ar-EG") : "—";
  const chicksCount = Number(cycle.number_of_chicks) || 0;
  const chickPrice = Number(cycle.chick_price) || 0;
  const totalCost = chicksCount * chickPrice;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleArea}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            <span>دورة نشطة</span>
          </div>
          <h2 className={styles.cycleTitle}>دورة سلالة {cycle.chick_type || "غير محدد"}</h2>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>تاريخ التسكين والبدء</span>
          <span className={styles.statValue}>{startDate}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>حجم القطيع الأولي</span>
          <span className={styles.statValue}>{chicksCount.toLocaleString("ar-EG")} كتكوت</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>سعر الكتكوت</span>
          <span className={styles.statValue}>{chickPrice.toLocaleString("ar-EG")} ج.م</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>إجمالي تكلفة الشراء</span>
          <span className={styles.statValue}>{totalCost.toLocaleString("ar-EG")} ج.م</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveCycleCard;
