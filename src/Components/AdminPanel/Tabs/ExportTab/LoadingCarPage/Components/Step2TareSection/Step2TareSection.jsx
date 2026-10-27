import { ArrowRight, ArrowLeft } from "lucide-react";
import TareWeighInput from "./Components/TareWeighInput/TareWeighInput";
import TareWeighList from "./Components/TareWeighList/TareWeighList";
import styles from "./Step2TareSection.module.css";

const Step2TareSection = ({ tareWeights, onAddTare, onRemoveTare, isReadOnly, onNext, onPrev }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h3>مرحلة وزن الأقفاص الفارغة (Tare Weights)</h3>
      <p>قم بوزن الأقفاص الفارغة قبل التحميل. تسجل الوزنات وتُحفظ تلقائياً في قاعدة البيانات والتخزين المحلي.</p>
    </div>
    <TareWeighInput onAdd={onAddTare} isReadOnly={isReadOnly} />
    <TareWeighList weights={tareWeights} onRemove={onRemoveTare} isReadOnly={isReadOnly} />
    <div className={styles.footer}>
      <button type="button" className={styles.prevBtn} onClick={onPrev}>
        <ArrowRight size={16} /><span>السابق (بيانات التاجر)</span>
      </button>
      <button type="button" className={styles.nextBtn} onClick={onNext}>
        <span>المتابعة لوزن الفراخ (الوزن القائم)</span><ArrowLeft size={16} />
      </button>
    </div>
  </div>
);

export default Step2TareSection;
