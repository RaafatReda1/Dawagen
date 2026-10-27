import { useState } from "react";
import { Users, UserPlus, ArrowLeft } from "lucide-react";
import ImporterSelector from "./Components/ImporterSelector/ImporterSelector";
import NewImporterSection from "./Components/NewImporterSection/NewImporterSection";
import VehicleFleetSelector from "./Components/VehicleFleetSelector/VehicleFleetSelector";
import CrateSpecsConfig from "./Components/CrateSpecsConfig/CrateSpecsConfig";
import styles from "./Step1ImporterVehicle.module.css";

const Step1ImporterVehicle = ({ form, setForm, importers = [], onNext, onAutoSave }) => {
  const [tab, setTab] = useState(form.new_name ? "new" : "select");
  const selectedImp = importers.find((i) => String(i.id) === String(form.importer_id));

  const handleSelectImp = (imp) => {
    const defaultV = Array.isArray(imp.vehicle_types) && imp.vehicle_types[0] ? imp.vehicle_types[0] : "";
    setForm((p) => ({ ...p, importer_id: imp.id, new_name: "", vehicle_type: p.vehicle_type || defaultV }));
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className={styles.container}>
      <div className={styles.typeTabs}>
        <button type="button" className={`${styles.typeTab} ${tab === "select" ? styles.activeType : ""}`} onClick={() => setTab("select")}>
          <Users size={16} /><span>اختيار من التجار المسجلين ({importers.length})</span>
        </button>
        <button type="button" className={`${styles.typeTab} ${tab === "new" ? styles.activeType : ""}`} onClick={() => { setTab("new"); setForm((p) => ({ ...p, importer_id: "" })); }}>
          <UserPlus size={16} /><span>تسجيل تاجر جديد</span>
        </button>
      </div>

      {tab === "select" ? (
        <ImporterSelector importers={importers} selectedId={form.importer_id} onSelect={handleSelectImp} onBlur={onAutoSave} />
      ) : (
        <NewImporterSection form={form} onChange={handleChange} onBlur={onAutoSave} />
      )}

      <VehicleFleetSelector importer={selectedImp} currentVehicle={form.vehicle_type} onSelectVehicle={(v) => setForm((p) => ({ ...p, vehicle_type: v }))} onBlur={onAutoSave} />
      <CrateSpecsConfig form={form} onChange={handleChange} onBlur={onAutoSave} />

      <div className={styles.footer}>
        <button type="button" className={styles.nextBtn} onClick={onNext}>
          <span>المتابعة لوزن الأقفاص الفارغة</span><ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Step1ImporterVehicle;
