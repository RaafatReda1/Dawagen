import { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import styles from "./GrossWeightInput.module.css";

const GROSS_NOTES = [
  { label: "مكتمل (100%)", val: "normal" },
  { label: "آخر رصة / ناقصة", val: "آخر رصة ناقصة" },
  { label: "قفص نصف ممتلئ", val: "قفص نصف ممتلئ" },
];

const GrossWeightInput = ({ onAdd, notify }) => {
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("normal");

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);
    if (!w || w <= 0) return notify("يرجى إدخال وزن قائم صحيح على الميزان", "error");
    onAdd({ weight: w, note: note?.trim() || "normal", date: new Date().toLocaleDateString("en-GB") });
    setWeight("");
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <div className={styles.inputWrap}>
        <CheckCircle2 size={18} className={styles.icon} />
        <input type="number" step="0.5" placeholder="أدخل الوزن القائم (كجم)..." value={weight} onChange={(e) => setWeight(e.target.value)} autoFocus />
      </div>
      <div className={styles.pills}>
        {GROSS_NOTES.map((n) => (
          <button key={n.val} type="button" className={`${styles.pill} ${note === n.val ? styles.activePill : ""}`} onClick={() => setNote(n.val)}>{n.label}</button>
        ))}
      </div>
      <button type="submit" className={styles.addBtn}><Plus size={16} /><span>تسجيل الوزن القائم (Enter)</span></button>
    </form>
  );
};

export default GrossWeightInput;
