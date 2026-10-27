import { useState, useEffect } from "react";
import { useExport } from "../../../Contexts/ExportContext";
import { useSaleWeights } from "./useSaleWeights";

const INIT_FORM = { importer_id: "", new_name: "", new_phone: "", new_place: "", new_vehicle: "", vehicle_type: "", crates_count: "", crate_capacity: "10", execution_price: "", payments: [] };

export const useAddSaleModal = () => {
  const { cycleId, rawData, notify, refetch, closeModal, selectedSaleForEdit, selectedImporterForSale } = useExport();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT_FORM);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saleId = selectedSaleForEdit?.id || null;

  const weights = useSaleWeights(saleId, selectedSaleForEdit?.tare_weights || [], selectedSaleForEdit?.gross_weights || [], (key, val) => {
    localStorage.setItem(`export_sale_${cycleId}_${saleId || "draft"}_${key}`, JSON.stringify(val));
  });

  useEffect(() => {
    if (selectedSaleForEdit) {
      setForm({ ...selectedSaleForEdit, importer_id: selectedSaleForEdit.importer_id || "", payments: selectedSaleForEdit.payments || [] });
      setStep(3);
    } else if (selectedImporterForSale) {
      const v = Array.isArray(selectedImporterForSale.vehicle_types) && selectedImporterForSale.vehicle_types[0] ? selectedImporterForSale.vehicle_types[0] : "";
      setForm((p) => ({ ...p, importer_id: selectedImporterForSale.id, vehicle_type: v }));
      setStep(2);
    }
  }, [selectedSaleForEdit, selectedImporterForSale]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleCloseAttempt = () => (form.new_name || form.importer_id || weights.tareWeights.length > 0 ? setShowDraftModal(true) : closeModal());

  const handleSaveDraft = () => {
    localStorage.setItem(`draft_export_${cycleId}`, JSON.stringify({ form, tare: weights.tareWeights, gross: weights.grossWeights }));
    notify("تم حفظ مسودة التحميل بنجاح في جهازك");
    setShowDraftModal(false);
    closeModal();
  };

  const handleDiscard = () => {
    localStorage.removeItem(`draft_export_${cycleId}`);
    setShowDraftModal(false);
    closeModal();
  };

  return { step, setStep, form, setForm, handleChange, weights, showDraftModal, setShowDraftModal, handleCloseAttempt, handleSaveDraft, handleDiscard, isSubmitting, setIsSubmitting, saleId, cycleId, importers: rawData?.importers || [], notify, refetch, closeModal };
};

export default useAddSaleModal;
