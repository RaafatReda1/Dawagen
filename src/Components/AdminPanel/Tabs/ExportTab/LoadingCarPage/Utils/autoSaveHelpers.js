import { createFarmSaleRecord, updateFarmSaleWeights } from "../../Utils";

export const persistSaleToDb = async ({
  cycleId,
  saleId,
  form,
  tareWeights,
  grossWeights,
}) => {
  const payload = {
    importer_id: form.importer_id ? Number(form.importer_id) : null,
    vehicle_type: form.vehicle_type?.trim() || "",
    crates_count: parseFloat(form.crates_count) || 0,
    crate_capacity: parseFloat(form.crate_capacity) || 10,
    execution_price: parseFloat(form.execution_price) || 0,
    tare_weights: tareWeights || [],
    gross_weights: grossWeights || [],
    payments: form.payments || [],
  };

  if (saleId && saleId !== "new") {
    return await updateFarmSaleWeights(saleId, payload);
  }

  // Create new record
  const created = await createFarmSaleRecord({
    ...payload,
    cycle_id: cycleId,
  });
  return created;
};
