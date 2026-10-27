import { Trash2 } from "lucide-react";
import { getWeightVal } from "../../../../Utils/chicksCalculations";
import styles from "./TareWeighList.module.css";

const TareWeighList = ({ weights = [], onRemove, isReadOnly }) => {
  if (weights.length === 0) {
    return (
      <div className={styles.empty}>
        لم يتم تسجيل أي وزنة فارغة بعد. ضع الأقفاص الفارغة على الميزان وسجل الوزن أعلاه.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {weights.map((w, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.meta}>
            <span className={styles.index}>#{idx + 1}</span>
            <strong className={styles.weight}>{getWeightVal(w)} كجم</strong>
            <span className={styles.crates}>({w.crates_count || 1} أقفاص)</span>
            {w.note && w.note !== "normal" && <span className={styles.note}>{w.note}</span>}
          </div>
          {!isReadOnly && (
            <button type="button" className={styles.delBtn} onClick={() => onRemove(idx)} aria-label="حذف الوزنة">
              <Trash2 size={15} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TareWeighList;
