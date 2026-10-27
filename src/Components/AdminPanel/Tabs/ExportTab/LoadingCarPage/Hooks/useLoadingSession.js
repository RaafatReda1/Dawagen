import { useState, useCallback, useEffect } from "react";
import { useLoadingCalculations } from "./useLoadingCalculations";
import { useLoadingRealtime } from "../Contexts/useLoadingRealtime";
import { useLoadingStorage } from "../Contexts/useLoadingStorage";
import { useReconciliation } from "./useReconciliation";
import { clearSessionLocal } from "../Utils/loadingStorageHelpers";
import { INIT_FORM } from "../Utils/sessionConstants";

export const useLoadingSession = ({ cycleId, initialSaleId, initialSaleData, initialImporter, onSaleIdChange }) => {
  const [saleId, setSaleId] = useState(initialSaleId);
  const [activeStep, setActiveStep] = useState(initialSaleData ? 2 : 1);
  const [form, setForm] = useState(() => (initialSaleData ? { ...INIT_FORM, ...initialSaleData } : { ...INIT_FORM, importer_id: initialImporter?.id || "" }));
  const [tareWeights, setTareWeights] = useState(initialSaleData?.tare_weights || []);
  const [grossWeights, setGrossWeights] = useState(initialSaleData?.gross_weights || []);

  const handleRemoteUpdate = useCallback((p) => {
    if (p.form) setForm((prev) => ({ ...prev, ...p.form }));
    if (p.tareWeights) setTareWeights(p.tareWeights);
    if (p.grossWeights) setGrossWeights(p.grossWeights);
  }, []);

  const { role, activeUsersCount, broadcastChange, claimWriter } = useLoadingRealtime(cycleId, saleId, handleRemoteUpdate);
  const { saveStatus, autoSave, currentSaleIdRef } = useLoadingStorage(cycleId, saleId, (newId) => {
    setSaleId(newId);
    if (onSaleIdChange) onSaleIdChange(newId);
  });
  const { conflictData, isModalOpen, checkConflict, dismiss } = useReconciliation(cycleId, saleId);
  const calculations = useLoadingCalculations(form, tareWeights, grossWeights);

  useEffect(() => {
    if (initialSaleData?.id) checkConflict(initialSaleData);
  }, []); // only run once on initial mount

  return {
    cycleId, saleId, activeStep, setActiveStep, form, setForm,
    tareWeights, setTareWeights, grossWeights, setGrossWeights,
    role, activeUsersCount, broadcastChange, claimWriter,
    saveStatus, autoSave, currentSaleIdRef,
    conflictData, isModalOpen, dismiss, calculations, clearDraft: () => clearSessionLocal(cycleId, saleId),
  };
};

export default useLoadingSession;
