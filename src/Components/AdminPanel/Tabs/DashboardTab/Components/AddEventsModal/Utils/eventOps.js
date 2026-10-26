import supabase from "../../../../../../../utils/supabase";

export const createEventRecord = async ({
  parent_day_id,
  temperature_inside,
  deaths,
  death_reason,
  performed_by,
}) => {
  const numericPerformedBy =
    performed_by && !isNaN(Number(performed_by))
      ? Number(performed_by)
      : null;

  const payload = {
    parent_day_id: Number(parent_day_id),
    temperature_inside:
      temperature_inside !== undefined && temperature_inside !== ""
        ? parseFloat(temperature_inside)
        : null,
    deaths:
      deaths !== undefined && deaths !== ""
        ? parseInt(deaths, 10)
        : null,
    death_reason:
      death_reason && !isNaN(Number(death_reason))
        ? Number(death_reason)
        : null,
    performed_by: numericPerformedBy,
  };

  const { data, error } = await supabase
    .from("Events")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
};
