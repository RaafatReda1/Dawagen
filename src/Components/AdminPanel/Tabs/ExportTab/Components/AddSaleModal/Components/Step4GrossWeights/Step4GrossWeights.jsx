import { ArrowRight, ArrowLeft } from "lucide-react";
import GrossWeightInput from "./Components/GrossWeightInput/GrossWeightInput";
import GrossWeightsList from "./Components/GrossWeightsList/GrossWeightsList";
import { calculateTareTotal, calculateGrossTotal, calculateNetWeight } from "../../../../Utils";
import styles from "./Step4GrossWeights.module.css";

const Step4GrossWeights = ({ weights, onNext, onPrev, notify }) => {
  const tareTotal = calculateTareTotal(weights.tareWeights);
  const grossTotal = calculateGrossTotal(weights.grossWeights);
  const netWeight = calculateNetWeight(grossTotal, tareTotal);

  const handleNext = () => {
    if (weights.grossWeights.length === 0) return notify("يرجى تسجيل وزنة قائمة واحدة على الأقل قبل المتابعة", "error");
    onNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}><span>إجمالي القائم</span><strong>{grossTotal.toLocaleString()} كجم</strong></div>
        <div className={styles.metricCard}><span>إجمالي الفارغ</span><strong>{tareTotal.toLocaleString()} كجم</strong></div>
        <div className={`${styles.metricCard} ${styles.netCard}`}><span>صافي وزن الفراخ المباعة</span><strong>{netWeight.toLocaleString()} كجم</strong></div>
      </div>
      <GrossWeightInput onAdd={weights.addGrossWeight} notify={notify} />
      <GrossWeightsList weights={weights.grossWeights} onRemove={weights.removeGrossWeight} />
      <div className={styles.footer}>
        <button type="button" className={styles.prevBtn} onClick={onPrev}><ArrowRight size={16} /><span>السابق</span></button>
        <button type="button" className={styles.nextBtn} onClick={handleNext}><span>المتابعة للحساب والدفعات</span><ArrowLeft size={16} /></button>
      </div>
    </div>
  );
};

export default Step4GrossWeights;
