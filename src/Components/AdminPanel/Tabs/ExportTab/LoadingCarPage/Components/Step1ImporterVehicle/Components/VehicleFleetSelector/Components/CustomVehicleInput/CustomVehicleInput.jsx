import { Plus, BookmarkCheck } from "lucide-react";
import styles from "./CustomVehicleInput.module.css";

const CustomVehicleInput = ({ customVehicle, setCustomVehicle, saveToFleet, setSaveToFleet, onApply }) => (
  <div className={styles.container}>
    <div className={styles.customWrap}>
      <input
        type="text"
        value={customVehicle}
        onChange={(e) => setCustomVehicle(e.target.value)}
        placeholder="أو اكتب نوع / رقم سيارة جديدة لهذا التحميل..."
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onApply(); } }}
      />
      <button type="button" className={styles.addBtn} onClick={onApply}>
        <Plus size={15} /><span>اعتماد هذه السيارة</span>
      </button>
    </div>
    <label className={styles.checkboxLabel}>
      <input type="checkbox" checked={saveToFleet} onChange={(e) => setSaveToFleet(e.target.checked)} />
      <BookmarkCheck size={14} /><span>حفظ هذه السيارة بشكل دائم في أسطول سيارات التاجر للمرات القادمة</span>
    </label>
  </div>
);

export default CustomVehicleInput;
