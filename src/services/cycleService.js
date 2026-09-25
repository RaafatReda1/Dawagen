import supabase from "../utils/supabase";
// THIS FILE HANDLES SUPABASE REQUESTS FOR CYCLES TABLE
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

export const fetchAllCycles = async () => {
  const { data, error } = await supabase
    .from("Cycles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchCycleById = async (id) => {
  if (!id) return null;
  const numericId = Number(id);

  let query = supabase.from("Cycles").select("*");
  if (!isNaN(numericId)) {
    query = query.or(`id.eq.${numericId},cycle_number.eq.${numericId}`);
  } else {
    query = query.eq("id", id);
  }

  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
};

export const createCycleInDb = async (cycleData) => {
  const payload = {
    chick_type: cycleData.chick_type,
    number_of_chicks: Number(cycleData.number_of_chicks),
    chick_price: Number(cycleData.chick_price),
    started_at: cycleData.started_at,
    is_active: true,
  };

  const { data, error } = await supabase
    .from("Cycles")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
};
