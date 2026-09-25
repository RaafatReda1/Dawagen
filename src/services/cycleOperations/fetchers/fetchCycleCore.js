import supabase from "../../../utils/supabase";

/**
 * Fetches the primary Cycles table record by ID.
 */
export const fetchCycleCore = async (cycleId) => {
  if (!cycleId) return null;
  const numericId = Number(cycleId);
  if (isNaN(numericId)) return null;

  const { data, error } = await supabase
    .from("Cycles")
    .select("*")
    .eq("id", numericId)
    .maybeSingle();

  if (error) throw error;
  return data;
};
