import { AlertCircle } from "lucide-react";
import styles from "./FeedConsumptionSelector.module.css";

const FeedConsumptionSelector = ({ value, onChange }) => {
  const isDamaged = value === "damaged";

  return (
    <div className={styles.group}>
      <label>حالة الاستهلاك</label>
      <select name="consumption_type" value={value} onChange={onChange}>
        <option value="consumed">استهلاك للطيور (علف مأكول)</option>
        <option value="damaged">هالك / تالف (تلف، رطوبة، هدر)</option>
      </select>
      {isDamaged && (
        <span className={styles.damagedNote}>
          <AlertCircle size={14} />
          <span>تم تسجيل هذا العلف كشكائر تالفة / هالكة بالمخزن.</span>
        </span>
      )}
    </div>
  );
};

export default FeedConsumptionSelector;
