import supabase from "../../../utils/supabase";

/**
 * Fetches MedicineInvoices (+Medicine+Suppliers), FeedShipments (+Suppliers),
 * FarmSales (+Importers), Importers list, Diseases list, Medicine list,
 * MedicineSuppliers list, and FeedSuppliers list.
 */
export const fetchCycleFinances = async (cycleId) => {
  const numericId = Number(cycleId);
  if (isNaN(numericId)) {
    return {
      medicineInvoices: [],
      medicine: [],
      medicineSuppliers: [],
      feedShipments: [],
      feedSuppliers: [],
      farmSales: [],
      importers: [],
      diseases: [],
    };
  }

  const [
    medInvoicesRes,
    feedShipmentsRes,
    farmSalesRes,
    importersRes,
    diseasesRes,
    feedSuppliersRes,
    medSuppliersRes,
    medicineRes
  ] = await Promise.all([
    supabase.from("MedicineInvoices").select("*, MedicineSuppliers(*), Medicine(*)").eq("cycle_id", numericId),
    supabase.from("FeedShipments").select("*, FeedSuppliers(*)").eq("cycle_id", numericId),
    supabase.from("FarmSales").select("*, Importers(*)").eq("cycle_id", numericId),
    supabase.from("Importers").select("*"),
    supabase.from("Diseases").select("*"),
    supabase.from("FeedSuppliers").select("*"),
    supabase.from("MedicineSuppliers").select("*"),
    supabase.from("Medicine").select("*"),
  ]);

  if (medInvoicesRes.error) throw medInvoicesRes.error;
  if (feedShipmentsRes.error) throw feedShipmentsRes.error;
  if (farmSalesRes.error) throw farmSalesRes.error;
  if (importersRes.error) throw importersRes.error;
  if (diseasesRes.error) throw diseasesRes.error;
  if (feedSuppliersRes.error) throw feedSuppliersRes.error;
  if (medSuppliersRes.error) throw medSuppliersRes.error;
  if (medicineRes.error) throw medicineRes.error;

  const medicineInvoices = medInvoicesRes.data || [];
  const allMedicine = medicineRes.data || [];

  // Filter medicine items relevant to this cycle's invoices if needed, or return all + filtered
  const invoiceIds = new Set(medicineInvoices.map((inv) => Number(inv.id)));
  const cycleMedicine = allMedicine.filter((m) => invoiceIds.has(Number(m.invoice_id)));

  return {
    medicineInvoices,
    medicine: cycleMedicine.length > 0 ? cycleMedicine : allMedicine,
    medicineSuppliers: medSuppliersRes.data || [],
    feedShipments: feedShipmentsRes.data || [],
    feedSuppliers: feedSuppliersRes.data || [],
    farmSales: farmSalesRes.data || [],
    importers: importersRes.data || [],
    diseases: diseasesRes.data || [],
  };
};
