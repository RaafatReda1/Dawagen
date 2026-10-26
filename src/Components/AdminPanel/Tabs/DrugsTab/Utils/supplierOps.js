import supabase from "../../../../../utils/supabase";

export const ensureMedicineSupplierRecord = async (supplierId, newSupplierName) => {
  if (supplierId) return Number(supplierId);
  const cleanName = newSupplierName?.trim();
  if (!cleanName) return null;

  const { data: existing } = await supabase
    .from("MedicineSuppliers")
    .select("id")
    .ilike("name", cleanName)
    .maybeSingle();

  if (existing?.id) return existing.id;

  const { data, error } = await supabase
    .from("MedicineSuppliers")
    .insert({ name: cleanName })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
};
