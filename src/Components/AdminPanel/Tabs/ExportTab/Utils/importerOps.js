import supabase from "../../../../../utils/supabase";

export const ensureImporterRecord = async (importerId, importerData = {}) => {
  if (importerId) return Number(importerId);
  const cleanName = importerData.name?.trim();
  if (!cleanName) return null;

  const { data: existing } = await supabase
    .from("Importers")
    .select("id, vehicle_types, phone_number")
    .ilike("name", cleanName)
    .maybeSingle();

  if (existing?.id) return existing.id;

  const payload = {
    name: cleanName,
    phone_number: importerData.phone ? [importerData.phone.trim()] : [],
    place: importerData.place?.trim() || null,
    vehicle_types: importerData.vehicle_type ? [importerData.vehicle_type.trim()] : [],
  };

  const { data, error } = await supabase
    .from("Importers")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
};

export const updateImporterVehicles = async (importerId, newVehicle) => {
  if (!importerId || !newVehicle?.trim()) return;
  const { data: imp } = await supabase.from("Importers").select("vehicle_types").eq("id", importerId).single();
  const current = Array.isArray(imp?.vehicle_types) ? imp.vehicle_types : [];
  if (!current.includes(newVehicle.trim())) {
    await supabase.from("Importers").update({ vehicle_types: [...current, newVehicle.trim()] }).eq("id", importerId);
  }
};
