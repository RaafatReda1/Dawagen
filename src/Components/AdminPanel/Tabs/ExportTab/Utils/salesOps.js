import supabase from "../../../../../utils/supabase";

export const createFarmSaleRecord = async ({
  cycle_id, importer_id, vehicle_type, crates_count,
  crate_capacity, execution_price, tare_weights = [],
  gross_weights = [], payments = [],
}) => {
  const payload = {
    cycle_id: Number(cycle_id),
    importer_id: importer_id ? Number(importer_id) : null,
    vehicle_type: vehicle_type?.trim() || "سيارة نصف نقل",
    crates_count: parseFloat(crates_count) || 0,
    crate_capacity: parseFloat(crate_capacity) || 10,
    execution_price: parseFloat(execution_price) || 0,
    tare_weights: Array.isArray(tare_weights) ? tare_weights : [],
    gross_weights: Array.isArray(gross_weights) ? gross_weights : [],
    payments: Array.isArray(payments) ? payments : [],
  };

  const { data, error } = await supabase
    .from("FarmSales")
    .insert(payload)
    .select("*, Importers(*)")
    .single();

  if (error) throw error;
  return data;
};

export const updateFarmSaleWeights = async (saleId, updates) => {
  const { data, error } = await supabase
    .from("FarmSales")
    .update(updates)
    .eq("id", Number(saleId))
    .select("*, Importers(*)")
    .single();

  if (error) throw error;
  return data;
};

export const deleteFarmSaleRecord = async (saleId) => {
  const { error } = await supabase.from("FarmSales").delete().eq("id", Number(saleId));
  if (error) throw error;
};
