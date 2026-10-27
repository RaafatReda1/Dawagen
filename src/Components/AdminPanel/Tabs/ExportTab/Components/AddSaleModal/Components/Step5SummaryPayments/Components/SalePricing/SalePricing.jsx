import styles from "./SalePricing.module.css";

const SalePricing = ({ netWeight, executionPrice, onPriceChange, totalPrice }) => (
  <div className={styles.wrapper}>
    <div className={styles.row}>
      <div className={styles.field}>
        <label>صافي الوزن الإجمالي</label>
        <span className={styles.val}>{netWeight.toLocaleString()} كجم</span>
      </div>

      <div className={styles.field}>
        <label>سعر الكيلو للتنفيذ (ج.م) *</label>
        <input
          type="number"
          step="0.5"
          value={executionPrice || ""}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="مثال: 68.5"
          className={styles.priceInput}
          min="1"
        />
      </div>

      <div className={styles.field}>
        <label>إجمالي قيمة الشحنة</label>
        <span className={styles.totalVal}>{totalPrice.toLocaleString()} ج.م</span>
      </div>
    </div>
  </div>
);

export default SalePricing;
