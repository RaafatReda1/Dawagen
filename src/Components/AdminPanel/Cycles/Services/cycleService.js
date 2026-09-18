import supabase from "../../../../utils/supabase";

export const fetchActiveCycle = async () => {
  const { data, error } = await supabase
    .from("Cycles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const fetchCyclesList = async () => {
  const { data, error } = await supabase
    .from("Cycles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createNewCycle = async (cycleData) => {
  // Optional: Deactivate older active cycles
  await supabase
    .from("Cycles")
    .update({ is_active: false })
    .eq("is_active", true);

  const { data, error } = await supabase
    .from("Cycles")
    .insert([
      {
        chick_type: cycleData.chick_type,
        number_of_chicks: Number(cycleData.number_of_chicks),
        chick_price: Number(cycleData.chick_price),
        started_at: cycleData.started_at,
        is_active: true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
