import styles from "./DrugForm.module.css";

const DrugForm = ({ form, onChange, onSubmit, isSubmitting, medicines, diseases }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <div className={styles.group}>
      <label>الدواء / العلاج</label>
      <select name="drug_id" value={form.drug_id} onChange={onChange} required>
        <option value="">-- اختر الدواء --</option>
        {medicines?.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} ({m.unit_capacity} {m.measurement_type || ""})
          </option>
        ))}
      </select>
    </div>
    <div className={styles.row}>
      <div className={styles.group}>
        <label>عدد العبوات</label>
        <input type="number" step="0.5" name="packages_count" value={form.packages_count} onChange={onChange} placeholder="1" required />
      </div>
      <div className={styles.group}>
        <label>الكمية المستهلكة (سم³ / جم)</label>
        <input type="number" step="0.1" name="consumed_capacity" value={form.consumed_capacity} onChange={onChange} placeholder="100" />
      </div>
    </div>
    <div className={styles.group}>
      <label>المرض المستهدف (اختياري)</label>
      <select name="disease_id" value={form.disease_id} onChange={onChange}>
        <option value="">-- بدون تحديد مرض --</option>
        {diseases?.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>
    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
      {isSubmitting ? "جاري الإرسال..." : "إضافة سحب الدواء"}
    </button>
  </form>
);

export default DrugForm;
