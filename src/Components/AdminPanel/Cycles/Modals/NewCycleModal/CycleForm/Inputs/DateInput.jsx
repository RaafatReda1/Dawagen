import styles from "./DateInput.module.css";

const DateInput = ({ label, value, onChange, error }) => {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        <span className={styles.required}>*</span> {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        style={error ? { borderColor: "#ff5252" } : {}}
      />
    </div>
  );
};

export default DateInput;
