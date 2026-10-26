import supabase from "../../../../../../../utils/supabase";

export const createExpenseRecord = async ({
  parent_event_id,
  expense_item,
  amount,
  payment_type,
}) => {
  const payload = {
    parent_event_id: Number(parent_event_id),
    expense_item: expense_item?.trim() || "مصروفات عامة",
    amount: parseFloat(amount) || 0,
    payment_type: payment_type || "cash",
  };

  const { data, error } = await supabase
    .from("DailyExpenses")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};
