import styles from "./ChickTypeSelect.module.css";

const PRESETS = ["كب (Cobb)", "روس (Ross)", "هبر (Hubbard)", "ساسو (Sasso)", "بلدي محسن", "إيفيان (Avian)"];

const ChickTypeSelect = ({ value, onChange, error }) => {
  return (
    <div className={styles.fieldGroup}>
      <div className={styles.labelRow}>
        <label className={styles.label}>
          <span className={styles.required}>*</span> نوع الكتكوت / السلالة
        </label>
      </div>

      <div className={styles.presetChips}>
        {PRESETS.map((preset) => (
          <button
            type="button"
            key={preset}
            className={`${styles.chip} ${value === preset ? styles.chipActive : ""}`}
            onClick={() => onChange(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="أو اكتب نوع وسلالة الكتكوت يدوياً..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        style={error ? { borderColor: "#ff5252" } : {}}
      />
    </div>
  );
};

export default ChickTypeSelect;
