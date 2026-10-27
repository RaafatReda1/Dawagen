import { Trash2 } from "lucide-react";
import { getWeightVal } from "../../../../../../Utils";
import styles from "./GrossWeightsList.module.css";

const GrossWeightsList = ({ weights = [], onRemove }) => {
  if (weights.length === 0) {
    return (
      <div className={styles.empty}>
        لم يتم تسجيل أوزان قائمة بعد. قم بوزن الأقفاص المحملة بالطيور وسجل هنا.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {weights.map((w, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.num}>#{idx + 1}</span>
            <span className={styles.weight}>{getWeightVal(w)} كجم</span>
            {w.note && w.note !== "normal" && <span className={styles.note}>{w.note}</span>}
          </div>
          <button type="button" className={styles.delBtn} onClick={() => onRemove(idx)} aria-label="حذف">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GrossWeightsList;
