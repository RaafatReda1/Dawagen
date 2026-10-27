import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import GrossInputFields from "./Components/GrossInputFields/GrossInputFields";
import FillStatusSelector from "../FillStatusSelector/FillStatusSelector";
import styles from "./GrossWeighInput.module.css";

const GrossWeighInput = ({ onAdd, crateCapacity = 10, isReadOnly }) => {
  const [weight, setWeight] = useState("");
  const [crates, setCrates] = useState("1");
  const [fillStatus, setFillStatus] = useState("full");
  const [chicks, setChicks] = useState(String(1 * Number(crateCapacity || 10)));

  useEffect(() => {
    if (fillStatus === "full") {
      setChicks(String((Number(crates) || 1) * Number(crateCapacity || 10)));
    }
  }, [fillStatus, crates, crateCapacity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const c = parseInt(chicks, 10);
    if (!w || w <= 0 || isNaN(c) || c <= 0) return;
    onAdd({ weight: w, crates_count: Number(crates) || 1, fill_status: fillStatus, chicks_count: c, note: fillStatus, timestamp: new Date().toLocaleTimeString("ar-EG") });
    setWeight("");
    if (fillStatus !== "full") setFillStatus("full");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <GrossInputFields weight={weight} setWeight={setWeight} crates={crates} setCrates={setCrates} chicks={chicks} setChicks={setChicks} fillStatus={fillStatus} isReadOnly={isReadOnly} />
      <FillStatusSelector value={fillStatus} onChange={setFillStatus} disabled={isReadOnly} />
      <button type="submit" className={styles.addBtn} disabled={isReadOnly}><Plus size={16} /><span>تسجيل الوزن القائم (Enter)</span></button>
    </form>
  );
};

export default GrossWeighInput;
