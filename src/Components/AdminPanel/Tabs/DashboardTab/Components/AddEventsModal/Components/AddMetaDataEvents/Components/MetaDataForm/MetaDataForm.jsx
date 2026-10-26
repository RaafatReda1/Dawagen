import MetaSuggestions from "./Components/MetaSuggestions/MetaSuggestions";
import styles from "./MetaDataForm.module.css";

const MetaDataForm = ({
  weights,
  meta,
  onWeightChange,
  onMetaChange,
  onSubmit,
  isSubmitting,
}) => {
  const handleSelectChip = (name) => {
    onMetaChange({ target: { name: "name", value: name } });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.sectionLabel}>أوزان الطيور (كجم)</label>
      <div className={styles.grid}>
        <input type="number" step="0.001" name="small" value={weights.small} onChange={onWeightChange} placeholder="صغير" />
        <input type="number" step="0.001" name="medium" value={weights.medium} onChange={onWeightChange} placeholder="متوسط" />
        <input type="number" step="0.001" name="large" value={weights.large} onChange={onWeightChange} placeholder="كبير" />
        <input type="number" step="0.001" name="sample" value={weights.sample} onChange={onWeightChange} placeholder="عشوائي" />
      </div>

      <label className={styles.sectionLabel}>ملاحظات وظروف بيئية</label>
      <MetaSuggestions onSelect={handleSelectChip} />
      <div className={styles.row}>
        <input type="text" name="name" value={meta.name} onChange={onMetaChange} placeholder="اسم الملاحظة (تهوية، رطوبة...)" />
        <input type="text" name="value" value={meta.value} onChange={onMetaChange} placeholder="القيمة" />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "جاري الحفظ..." : "حفظ الملاحظات والأوزان"}
      </button>
    </form>
  );
};

export default MetaDataForm;
