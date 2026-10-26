import supabase from "../../../../../../../utils/supabase";

export const createFollowUpRecord = async ({
  parent_day_id,
  weight_small,
  weight_medium,
  weight_large,
  wight_random_sample,
}) => {
  const payload = {
    parent_day_id: Number(parent_day_id),
    weight_small: weight_small ? parseFloat(weight_small) : null,
    weight_medium: weight_medium ? parseFloat(weight_medium) : null,
    weight_large: weight_large ? parseFloat(weight_large) : null,
    wight_random_sample: wight_random_sample
      ? parseFloat(wight_random_sample)
      : null,
  };

  const { data, error } = await supabase
    .from("FollowUpData")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};
