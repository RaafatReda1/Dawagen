import { ArrowRight, ArrowLeft } from "lucide-react";
import TareWeightInput from "./Components/TareWeightInput/TareWeightInput";
import TareWeightsList from "./Components/TareWeightsList/TareWeightsList";
import { calculateTareTotal } from "../../../../Utils";
import styles from "./Step3TareWeights.module.css";

const Step3TareWeights = ({ weights, onNext, onPrev, notify }) => {
  const tareTotal = calculateTareTotal(weights.tareWeights);

  const handleNext = () => {
    if (weights.tareWeights.length === 0) return notify("يرجى تسجيل وزنة فارغة واحدة على الأقل قبل المتابعة", "error");
    onNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.summaryBox}>
        <div>
          <span className={styles.summaryLabel}>إجمالي الوزن الفارغ المسجل:</span>
          <strong className={styles.summaryVal}>{tareTotal.toLocaleString(undefined, { maximumFractionDigits: 1 })} كجم</strong>
        </div>
        <span className={styles.countBadge}>{weights.tareWeights.length} وزنات فارغة</span>
      </div>

      <TareWeightInput onAdd={weights.addTareWeight} notify={notify} />
      <TareWeightsList weights={weights.tareWeights} onRemove={weights.removeTareWeight} />

      <div className={styles.footer}>
        <button type="button" className={styles.prevBtn} onClick={onPrev}>
          <ArrowRight size={16} />
          <span>السابق (بيانات السيارة)</span>
        </button>
        <button type="button" className={styles.nextBtn} onClick={handleNext}>
          <span>المتابعة لوزن الفراخ (الوزن القائم)</span>
          <ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Step3TareWeights;
