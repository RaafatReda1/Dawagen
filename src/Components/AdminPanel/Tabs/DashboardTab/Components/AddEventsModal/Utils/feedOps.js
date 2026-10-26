import supabase from "../../../../../../../utils/supabase";

export const createFeedWithdrawRecord = async ({
  parent_event_id,
  food_id,
  sacks_consumed,
  consumption_type,
}) => {
  const payload = {
    parent_event_id: Number(parent_event_id),
    food_id: food_id ? Number(food_id) : null,
    sacks_consumed: sacks_consumed ? parseFloat(sacks_consumed) : 0,
    consumption_type: consumption_type || "consumed_manual",
  };

  const { data, error } = await supabase
    .from("FoodWithdraw")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};
