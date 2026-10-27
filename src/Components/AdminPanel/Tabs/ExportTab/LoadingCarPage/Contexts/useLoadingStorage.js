import { useState, useCallback, useRef } from "react";
import { saveSessionLocal } from "../Utils/loadingStorageHelpers";
import { persistSaleToDb } from "../Utils/autoSaveHelpers";

export const useLoadingStorage = (cycleId, initialSaleId, onSaleCreated) => {
  const [saveStatus, setSaveStatus] = useState("saved"); // saved | saving | error
  const currentSaleIdRef = useRef(initialSaleId);

  const autoSave = useCallback(async ({ form, tareWeights, grossWeights, broadcastChange }) => {
    saveSessionLocal(cycleId, currentSaleIdRef.current, { form, tareWeights, grossWeights });
    if (broadcastChange) broadcastChange({ form, tareWeights, grossWeights });

    if (!form.importer_id && !form.new_name) return; // wait until importer assigned
    setSaveStatus("saving");

    try {
      const result = await persistSaleToDb({
        cycleId,
        saleId: currentSaleIdRef.current,
        form,
        tareWeights,
        grossWeights,
      });

      if (!currentSaleIdRef.current || currentSaleIdRef.current === "new") {
        if (result?.id) {
          currentSaleIdRef.current = result.id;
          if (onSaleCreated) onSaleCreated(result.id);
        }
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, [cycleId, onSaleCreated]);

  return {
    saveStatus,
    setSaveStatus,
    autoSave,
    currentSaleIdRef,
  };
};

export default useLoadingStorage;
