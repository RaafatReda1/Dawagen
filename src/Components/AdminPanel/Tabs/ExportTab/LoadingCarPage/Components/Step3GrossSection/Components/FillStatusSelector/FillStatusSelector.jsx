import styles from "./FillStatusSelector.module.css";

const OPTIONS = [
  { val: "full", label: "مكتمل بالكامل (100%)", desc: "الحمولة القياسية للقفص" },
  { val: "partial", label: "قفص ناقص / غير مكتمل", desc: "يلزم تحديد عدد الطيور" },
  { val: "extra", label: "قفص زائد / مكثف", desc: "يلزم تحديد عدد الطيور" },
];

const FillStatusSelector = ({ value = "full", onChange, disabled }) => (
  <div className={styles.container}>
    <label className={styles.label}>حالة امتلاء الأقفاص بالوزنة *</label>
    <div className={styles.pills}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.val}
          type="button"
          className={`${styles.pill} ${value === opt.val ? styles.active : ""}`}
          onClick={() => onChange(opt.val)}
          disabled={disabled}
        >
          <span className={styles.optLabel}>{opt.label}</span>
          <span className={styles.optDesc}>{opt.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

export default FillStatusSelector;
