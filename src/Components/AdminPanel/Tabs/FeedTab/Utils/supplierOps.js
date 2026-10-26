import supabase from "../../../../../utils/supabase";

export const ensureSupplierRecord = async (supplierId, supplierName) => {
  if (supplierId && !isNaN(Number(supplierId))) return Number(supplierId);
  if (!supplierName?.trim()) return null;

  const { data, error } = await supabase
    .from("FeedSuppliers")
    .insert({ name: supplierName.trim() })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
};
