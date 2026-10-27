import { useState, useMemo } from "react";
import { updateImporterVehicles } from "../../Utils";

export const useVehicleSelection = (importer, currentVehicle, onSelectVehicle) => {
  const [saveToFleet, setSaveToFleet] = useState(true);
  const [customVehicle, setCustomVehicle] = useState("");

  const savedVehicles = useMemo(() => {
    if (!importer || !Array.isArray(importer.vehicle_types)) return [];
    return importer.vehicle_types.filter(Boolean);
  }, [importer]);

  const selectExisting = (v) => {
    onSelectVehicle(v);
    setCustomVehicle("");
  };

  const applyCustom = async () => {
    const val = customVehicle.trim();
    if (!val) return;
    onSelectVehicle(val);
    if (saveToFleet && importer?.id) {
      await updateImporterVehicles(importer.id, val);
    }
  };

  return {
    savedVehicles,
    customVehicle,
    setCustomVehicle,
    saveToFleet,
    setSaveToFleet,
    selectExisting,
    applyCustom,
  };
};

export default useVehicleSelection;
