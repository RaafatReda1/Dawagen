import { Scale, Check } from "lucide-react";
import { getWeightVal } from "../../../../../../Utils";
import styles from "./SaleWeightsDetails.module.css";

const SaleWeightsDetails = ({ tareWeights = [], grossWeights = [] }) => (
  <div className={styles.grid}>
    <div className={styles.column}>
      <div className={styles.colHeader}><Scale size={15} className={styles.tareIcon} /><h4>الأوزان الفارغة ({tareWeights.length})</h4></div>
      <div className={styles.itemsList}>
        {tareWeights.length === 0 ? <span className={styles.empty}>لم تسجل أوزان فارغة</span> : (
          tareWeights.map((w, idx) => (
            <div key={idx} className={styles.weightItem}>
              <span className={styles.num}>#{idx + 1}</span><span className={styles.val}>{getWeightVal(w)} كجم</span>
              {w.note && <span className={styles.note}>{w.note}</span>}{w.date && <span className={styles.date}>{w.date}</span>}
            </div>
          ))
        )}
      </div>
    </div>
    <div className={styles.column}>
      <div className={styles.colHeader}><Check size={15} className={styles.grossIcon} /><h4>الأوزان القائمة ({grossWeights.length})</h4></div>
      <div className={styles.itemsList}>
        {grossWeights.length === 0 ? <span className={styles.empty}>لم تسجل أوزان قائمة</span> : (
          grossWeights.map((w, idx) => (
            <div key={idx} className={styles.weightItem}>
              <span className={styles.num}>#{idx + 1}</span><span className={styles.val}>{getWeightVal(w)} كجم</span>
              {w.note && <span className={styles.note}>{w.note}</span>}{w.date && <span className={styles.date}>{w.date}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

export default SaleWeightsDetails;
