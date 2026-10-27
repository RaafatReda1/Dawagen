import { useState } from "react";
import { Plus, Scale } from "lucide-react";
import styles from "./TareWeighInput.module.css";

const TareWeighInput = ({ onAdd, isReadOnly }) => {
  const [weight, setWeight] = useState("");
  const [crates, setCrates] = useState("1");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    onAdd({
      weight: w,
      crates_count: Number(crates) || 1,
      note: note.trim() || "normal",
      timestamp: new Date().toLocaleTimeString("ar-EG"),
    });
    setWeight("");
    setCrates("1");
    setNote("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>وزن الفارغ على الميزان (كجم) *</label>
        <div className={styles.inputWrap}>
          <Scale size={18} className={styles.icon} />
          <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="مثال: 45.5" disabled={isReadOnly} required autoFocus />
        </div>
      </div>
      <div className={styles.fieldSmall}>
        <label>عدد الأقفاص</label>
        <input type="number" value={crates} onChange={(e) => setCrates(e.target.value)} min="1" disabled={isReadOnly} />
      </div>
      <div className={styles.field}>
        <label>ملاحظة اختيارية</label>
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="مثال: رصة أولى" disabled={isReadOnly} />
      </div>
      <button type="submit" className={styles.addBtn} disabled={isReadOnly}>
        <Plus size={16} /><span>تسجيل الوزنة (Enter)</span>
      </button>
    </form>
  );
};

export default TareWeighInput;
