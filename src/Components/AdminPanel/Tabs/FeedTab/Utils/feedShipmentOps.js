import supabase from "../../../../../utils/supabase";

export const createFeedShipmentRecord = async ({
  cycle_id,
  supplier_id,
  feed_name,
  sacks_count,
  sack_weight,
  sack_price,
  paid_amount,
  payment_type,
}) => {
  const hasPayment = paid_amount && parseFloat(paid_amount) > 0;
  const payload = {
    cycle_id: Number(cycle_id),
    supplier_id: supplier_id ? Number(supplier_id) : null,
    feed_name: feed_name?.trim() || "علف",
    sacks_count: parseFloat(sacks_count) || 0,
    sack_weight: parseFloat(sack_weight) || 25,
    sack_price: parseFloat(sack_price) || 0,
    payments: hasPayment ? [{ amount: parseFloat(paid_amount), payment_type: payment_type || "cash", date: new Date().toISOString() }] : [],
  };

  const { data, error } = await supabase.from("FeedShipments").insert(payload).select().single();
  if (error) throw error;
  return data;
};
