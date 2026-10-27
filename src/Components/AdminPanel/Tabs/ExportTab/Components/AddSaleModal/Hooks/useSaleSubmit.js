import { ensureImporterRecord, updateImporterVehicles, createFarmSaleRecord, updateFarmSaleWeights } from "../../../Utils";

export const useSaleSubmit = ({ cycleId, saleId, form, weights, setIsSubmitting, notify, refetch, closeModal }) => {
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const importerId = await ensureImporterRecord(form.importer_id, {
        name: form.new_name, phone: form.new_phone, place: form.new_place, vehicle_type: form.new_vehicle || form.vehicle_type,
      });

      if (importerId && form.vehicle_type) await updateImporterVehicles(importerId, form.vehicle_type);

      const payload = {
        importer_id: importerId, vehicle_type: form.vehicle_type,
        crates_count: parseFloat(form.crates_count) || 0, crate_capacity: parseFloat(form.crate_capacity) || 10,
        execution_price: parseFloat(form.execution_price) || 0, tare_weights: weights.tareWeights,
        gross_weights: weights.grossWeights, payments: form.payments,
      };

      if (saleId) {
        await updateFarmSaleWeights(saleId, payload);
      } else {
        await createFarmSaleRecord({ ...form, cycle_id: cycleId, ...payload });
      }

      localStorage.removeItem(`draft_export_${cycleId}`);
      notify("تم حفظ وتسجيل شحنة التحميل والموازين بنجاح!");
      if (refetch) refetch();
      closeModal();
    } catch (err) {
      notify("فشل حفظ بيانات الشحنة: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit };
};

export default useSaleSubmit;
