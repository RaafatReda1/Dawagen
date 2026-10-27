import { ArrowRight, ArrowLeft } from "lucide-react";
import GrossWeighInput from "./Components/GrossWeighInput/GrossWeighInput";
import GrossWeighList from "./Components/GrossWeighList/GrossWeighList";
import styles from "./Step3GrossSection.module.css";

const Step3GrossSection = ({ grossWeights, onAddGross, onRemoveGross, crateCapacity, isReadOnly, onNext, onPrev }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h3>مرحلة وزن الفراخ القائم (Gross Weights & Chick Counts)</h3>
      <p>الأقفاص ممتلئة بالكامل افتراضياً. إذا كان القفص ناقصاً أو به حمولة زائدة، حدد عدد الطيور بدقة لضبط الحسابات والمتوسطات.</p>
    </div>
    <GrossWeighInput onAdd={onAddGross} crateCapacity={crateCapacity} isReadOnly={isReadOnly} />
    <GrossWeighList weights={grossWeights} onRemove={onRemoveGross} isReadOnly={isReadOnly} crateCapacity={crateCapacity} />
    <div className={styles.footer}>
      <button type="button" className={styles.prevBtn} onClick={onPrev}>
        <ArrowRight size={16} /><span>السابق (وزن الفارغ)</span>
      </button>
      <button type="button" className={styles.nextBtn} onClick={onNext}>
        <span>المتابعة للحساب والدفعات</span><ArrowLeft size={16} />
      </button>
    </div>
  </div>
);

export default Step3GrossSection;
