import styles from "./CrateSpecsConfig.module.css";

const CrateSpecsConfig = ({ form, onChange, onBlur }) => (
  <div className={styles.grid}>
    <div className={styles.field}>
      <label>عدد الأقفاص الإجمالي بالسيارة *</label>
      <input type="number" name="crates_count" value={form.crates_count || ""} onChange={onChange} onBlur={onBlur} placeholder="مثال: 50 قفص" min="1" />
    </div>
    <div className={styles.field}>
      <label>سعة القفص الافتراضية (عدد الطيور)</label>
      <input type="number" name="crate_capacity" value={form.crate_capacity || "10"} onChange={onChange} onBlur={onBlur} placeholder="مثال: 10 طيور" min="1" />
    </div>
    <div className={styles.field}>
      <label>سعر كيلو التنفيذ المبدئي (ج.م)</label>
      <input type="number" step="0.5" name="execution_price" value={form.execution_price || ""} onChange={onChange} onBlur={onBlur} placeholder="مثال: 72.5" />
    </div>
  </div>
);

export default CrateSpecsConfig;
