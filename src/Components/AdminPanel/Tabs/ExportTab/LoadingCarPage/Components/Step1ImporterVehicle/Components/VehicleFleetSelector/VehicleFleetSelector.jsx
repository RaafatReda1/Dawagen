import { Truck } from "lucide-react";
import { useVehicleSelection } from "../../../../Hooks/useVehicleSelection";
import CustomVehicleInput from "./Components/CustomVehicleInput/CustomVehicleInput";
import styles from "./VehicleFleetSelector.module.css";

const VehicleFleetSelector = ({ importer, currentVehicle, onSelectVehicle, onBlur }) => {
  const v = useVehicleSelection(importer, currentVehicle, onSelectVehicle);

  return (
    <div className={styles.container}>
      <label className={styles.sectionLabel}><Truck size={16} /><span>تحديد نوع / لوحة السيارة لهذه الشحنة *</span></label>
      {v.savedVehicles.length > 0 && (
        <div className={styles.fleetWrap}>
          <span className={styles.fleetTitle}>السيارات المسجلة مسبقاً لهذا التاجر:</span>
          <div className={styles.chips}>
            {v.savedVehicles.map((item) => (
              <button key={item} type="button" className={`${styles.chip} ${currentVehicle === item ? styles.activeChip : ""}`} onClick={() => { v.selectExisting(item); if (onBlur) onBlur(); }}>
                <Truck size={14} /><span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <CustomVehicleInput customVehicle={v.customVehicle} setCustomVehicle={v.setCustomVehicle} saveToFleet={v.saveToFleet} setSaveToFleet={v.setSaveToFleet} onApply={() => { v.applyCustom(); if (onBlur) onBlur(); }} />
    </div>
  );
};

export default VehicleFleetSelector;
