import styles from "./NumberInput.module.css";

const NumberInput = ({ label, value, onChange, placeholder, unit, min = 0, step = "1", error, helper }) => {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        <span className={styles.required}>*</span> {label}
      </label>
      <div className={styles.inputWrapper} style={error ? { borderColor: "#ff5252" } : {}}>
        <input
          type="number"
          min={min}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {helper && <span className={styles.helper}>{helper}</span>}
    </div>
  );
};

export default NumberInput;
