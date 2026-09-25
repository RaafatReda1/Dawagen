import supabase from "../../../utils/supabase";

/**
 * Fetches MedicineInvoices (+Medicine+Suppliers), FeedShipments (+Suppliers),
 * FarmSales (+Importers), Importers list, and Diseases list for a cycle.
 */
export const fetchCycleFinances = async (cycleId) => {
  const numericId = Number(cycleId);
  if (isNaN(numericId)) {
    return { medicineInvoices: [], feedShipments: [], farmSales: [], importers: [], diseases: [] };
  }

  const [
    medInvoicesRes,
    feedShipmentsRes,
    farmSalesRes,
    importersRes,
    diseasesRes
  ] = await Promise.all([
    supabase.from("MedicineInvoices").select("*, MedicineSuppliers(*), Medicine(*)").eq("cycle_id", numericId),
    supabase.from("FeedShipments").select("*, FeedSuppliers(*)").eq("cycle_id", numericId),
    supabase.from("FarmSales").select("*, Importers(*)").eq("cycle_id", numericId),
    supabase.from("Importers").select("*"),
    supabase.from("Diseases").select("*"),
  ]);

  if (medInvoicesRes.error) throw medInvoicesRes.error;
  if (feedShipmentsRes.error) throw feedShipmentsRes.error;
  if (farmSalesRes.error) throw farmSalesRes.error;
  if (importersRes.error) throw importersRes.error;
  if (diseasesRes.error) throw diseasesRes.error;

  return {
    medicineInvoices: medInvoicesRes.data || [],
    feedShipments: feedShipmentsRes.data || [],
    farmSales: farmSalesRes.data || [],
    importers: importersRes.data || [],
    diseases: diseasesRes.data || [],
  };
};
