import supabase from "../../../../../../../utils/supabase";

export const ensureDayRecord = async (day, cycleId) => {
  if (day?.id) return day.id;

  const payload = {
    cycle_id: Number(cycleId),
    day_number: Number(day?.day_number || 1),
    notes: day?.notes || null,
  };

  const { data, error } = await supabase
    .from("Days")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
};
