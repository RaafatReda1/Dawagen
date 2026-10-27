import { useState } from "react";
import { Plus, Scale } from "lucide-react";
import styles from "./TareWeightInput.module.css";

const RATIOS = [
  { label: "كامل (100%)", val: "normal" },
  { label: "نصف قفص", val: "نصف قفص" },
  { label: "قفص ناقص", val: "قفص ناقص" },
];

const TareWeightInput = ({ onAdd, notify }) => {
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("normal");

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);
    if (!w || w <= 0) return notify("يرجى إدخال وزن صحيح على الميزان", "error");
    onAdd({ weight: w, note: note?.trim() || "normal", date: new Date().toLocaleDateString("en-GB") });
    setWeight("");
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <div className={styles.inputWrap}>
        <Scale size={18} className={styles.icon} />
        <input type="number" step="0.1" placeholder="أدخل وزن الفارغ (كجم)..." value={weight} onChange={(e) => setWeight(e.target.value)} autoFocus />
      </div>
      <div className={styles.ratioPills}>
        {RATIOS.map((r) => (
          <button key={r.val} type="button" className={`${styles.pill} ${note === r.val ? styles.activePill : ""}`} onClick={() => setNote(r.val)}>{r.label}</button>
        ))}
      </div>
      <button type="submit" className={styles.addBtn}><Plus size={16} /><span>تسجيل الوزنة (Enter)</span></button>
    </form>
  );
};

export default TareWeightInput;
