import supabase from "../../../../../../../utils/supabase";

export const createMetaDataRecord = async ({ parent_day_id, meta_name, meta_value }) => {
  const payload = {
    parent_day_id: Number(parent_day_id),
    meta_name: meta_name?.trim() || "ملاحظة",
    meta_value: meta_value?.trim() || "",
  };

  const { data, error } = await supabase
    .from("MetaData")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};
