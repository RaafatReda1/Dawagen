import styles from "./PriceAndSummary.module.css";

const PriceAndSummary = ({ executionPrice, onPriceChange, onBlur, calculations, isReadOnly }) => {
  const { netWeight, totalValue, paidTotal, remaining } = calculations;

  return (
    <div className={styles.container}>
      <div className={styles.priceRow}>
        <div className={styles.field}>
          <label>سعر الكيلو للتنفيذ (ج.م) *</label>
          <input
            type="number"
            step="0.5"
            value={executionPrice || ""}
            onChange={(e) => onPriceChange(e.target.value)}
            onBlur={onBlur}
            placeholder="مثال: 70"
            disabled={isReadOnly}
          />
        </div>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.card}><span>الوزن الصافي المباع:</span><strong>{netWeight.toLocaleString()} كجم</strong></div>
        <div className={styles.card}><span>إجمالي قيمة الشحنة:</span><strong className={styles.total}>{totalValue.toLocaleString()} ج.م</strong></div>
        <div className={styles.card}><span>المسدد من التاجر:</span><strong className={styles.paid}>{paidTotal.toLocaleString()} ج.م</strong></div>
        <div className={`${styles.card} ${remaining > 0 ? styles.debtCard : ""}`}>
          <span>المتبقي المطلوب تحصيله:</span>
          <strong>{remaining.toLocaleString()} ج.م</strong>
        </div>
      </div>
    </div>
  );
};

export default PriceAndSummary;
