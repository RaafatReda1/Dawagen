import supabase from "../../../../../../../utils/supabase";

export const createDrugWithdrawRecord = async ({
  parent_event_id,
  drug_id,
  packages_count,
  consumed_capacity,
  disease_id,
}) => {
  const payload = {
    parent_event_id: Number(parent_event_id),
    drug_id: Number(drug_id),
    packages_count: packages_count ? parseFloat(packages_count) : 0,
    consumed_capacity: consumed_capacity
      ? parseFloat(consumed_capacity)
      : 0,
    disease_id: disease_id ? Number(disease_id) : null,
  };

  const { data, error } = await supabase
    .from("DrugWithdraw")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};
