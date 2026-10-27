import { Trash2 } from "lucide-react";
import { getWeightVal, getChicksVal } from "../../../../Utils/chicksCalculations";
import styles from "./GrossWeighList.module.css";

const GrossWeighList = ({ weights = [], onRemove, isReadOnly, crateCapacity = 10 }) => {
  if (weights.length === 0) {
    return (
      <div className={styles.empty}>
        لم يتم تسجيل أي وزنة قائمة بعد. قم بوزن الأقفاص المحملة بالدواجن وسجل أعلاه.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {weights.map((w, idx) => {
        const chicks = getChicksVal(w, crateCapacity);
        const fillStatus = w.fill_status || "full";

        return (
          <div key={idx} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.index}>#{idx + 1}</span>
              <strong className={styles.weight}>{getWeightVal(w)} كجم</strong>
              <span className={styles.crates}>({w.crates_count || 1} أقفاص)</span>
              <span className={`${styles.fillBadge} ${styles[fillStatus]}`}>
                {fillStatus === "full" ? "مكتمل (100%)" : fillStatus === "partial" ? "ناقص" : "زائد"}
              </span>
              <span className={styles.chicksBadge}>{chicks} طائر</span>
            </div>
            {!isReadOnly && (
              <button type="button" className={styles.delBtn} onClick={() => onRemove(idx)} aria-label="حذف الوزنة">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GrossWeighList;
