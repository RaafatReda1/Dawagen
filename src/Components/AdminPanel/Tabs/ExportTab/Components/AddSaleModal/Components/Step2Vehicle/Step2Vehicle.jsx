import { ArrowRight, ArrowLeft } from "lucide-react";
import styles from "./Step2Vehicle.module.css";

const QUICK_VEHICLES = ["سيارة جامبو", "سيارة دبابة", "سيارة نصف نقل", "تريلا قفص"];

const Step2Vehicle = ({ form, onChange, onNext, onPrev, notify }) => {
  const handleNext = () => {
    if (!form.vehicle_type?.trim()) return notify("يرجى تحديد أو إدخال نوع السيارة", "error");
    if (!form.crates_count || Number(form.crates_count) <= 0) return notify("يرجى إدخال عدد الأقفاص", "error");
    onNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.group}>
          <label>نوع السيارة / المركبة *</label>
          <div className={styles.chips}>
            {QUICK_VEHICLES.map((v) => (
              <button key={v} type="button" className={`${styles.chip} ${form.vehicle_type === v ? styles.activeChip : ""}`} onClick={() => onChange({ target: { name: "vehicle_type", value: v } })}>{v}</button>
            ))}
          </div>
          <input type="text" name="vehicle_type" value={form.vehicle_type || ""} onChange={onChange} placeholder="أو اكتب نوع المركبة يدوياً" />
        </div>
        <div className={styles.group}>
          <label>عدد الأقفاص الإجمالي *</label>
          <input type="number" name="crates_count" value={form.crates_count || ""} onChange={onChange} placeholder="مثال: 50" min="1" />
        </div>
        <div className={styles.group}>
          <label>سعة القفص (عدد الطيور)</label>
          <input type="number" name="crate_capacity" value={form.crate_capacity || "10"} onChange={onChange} placeholder="مثال: 10" min="1" />
        </div>
        <div className={styles.group}>
          <label>سعر الكيلو للتنفيذ (ج.م)</label>
          <input type="number" step="0.5" name="execution_price" value={form.execution_price || ""} onChange={onChange} placeholder="مثال: 68.5" />
        </div>
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.prevBtn} onClick={onPrev}><ArrowRight size={16} /><span>السابق</span></button>
        <button type="button" className={styles.nextBtn} onClick={handleNext}><span>بدء وزن الأقفاص الفارغة</span><ArrowLeft size={16} /></button>
      </div>
    </div>
  );
};

export default Step2Vehicle;
