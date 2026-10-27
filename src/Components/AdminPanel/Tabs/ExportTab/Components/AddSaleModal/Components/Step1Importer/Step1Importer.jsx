import { useState } from "react";
import { Users, UserPlus, ArrowLeft } from "lucide-react";
import ImporterPicker from "./Components/ImporterPicker/ImporterPicker";
import NewImporterFields from "./Components/NewImporterFields/NewImporterFields";
import styles from "./Step1Importer.module.css";

const Step1Importer = ({ form, setForm, onChange, importers = [], onNext, notify }) => {
  const [mode, setMode] = useState(form.new_name ? "new" : "select");

  const handleNext = () => {
    if (mode === "select" && !form.importer_id) return notify("يرجى اختيار تاجر للمتابعة أو إضافة تاجر جديد", "error");
    if (mode === "new" && !form.new_name?.trim()) return notify("يرجى إدخال اسم التاجر الجديد", "error");
    onNext();
  };

  const handleSelect = (imp) => {
    const v = Array.isArray(imp.vehicle_types) && imp.vehicle_types[0] ? imp.vehicle_types[0] : "";
    setForm((p) => ({ ...p, importer_id: imp.id, new_name: "", vehicle_type: p.vehicle_type || v }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${mode === "select" ? styles.activeTab : ""}`} onClick={() => setMode("select")}>
          <Users size={16} /><span>التجار المسجلون ({importers.length})</span>
        </button>
        <button type="button" className={`${styles.tab} ${mode === "new" ? styles.activeTab : ""}`} onClick={() => { setMode("new"); setForm((p) => ({ ...p, importer_id: "" })); }}>
          <UserPlus size={16} /><span>تسجيل تاجر جديد</span>
        </button>
      </div>
      <div className={styles.body}>
        {mode === "select" ? <ImporterPicker importers={importers} selectedId={form.importer_id} onSelect={handleSelect} /> : <NewImporterFields form={form} onChange={onChange} />}
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.nextBtn} onClick={handleNext}>
          <span>المتابعة لبيانات الحمولة والسيارة</span><ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Step1Importer;
