import supabase from "../../../../../utils/supabase";

export const createMedicineInvoiceRecord = async ({
  cycle_id,
  supplier_id,
  total_price,
  paid_amount,
  payment_type,
  disease_id,
  medicines = [],
}) => {
  const hasPayment = paid_amount && parseFloat(paid_amount) > 0;
  const invoicePayload = {
    cycle_id: Number(cycle_id),
    supplier_id: supplier_id ? Number(supplier_id) : null,
    total_price: parseFloat(total_price) || 0,
    disease_id: disease_id ? Number(disease_id) : null,
    payments: hasPayment
      ? [{ amount: parseFloat(paid_amount), payment_type: payment_type || "cash", date: new Date().toISOString() }]
      : [],
  };

  const { data: invoice, error: invError } = await supabase
    .from("MedicineInvoices")
    .insert(invoicePayload)
    .select()
    .single();

  if (invError) throw invError;

  if (medicines.length > 0 && invoice?.id) {
    const itemsPayload = medicines.map((m) => ({
      invoice_id: invoice.id,
      name: m.name?.trim() || "دواء",
      units_count: parseFloat(m.units_count) || 1,
      unit_capacity: parseFloat(m.unit_capacity) || 0,
      measurement_type: m.measurement_type || "مل",
      unit_price: parseFloat(m.unit_price) || 0,
    }));

    const { error: medError } = await supabase.from("Medicine").insert(itemsPayload);
    if (medError) throw medError;
  }

  return invoice;
};
