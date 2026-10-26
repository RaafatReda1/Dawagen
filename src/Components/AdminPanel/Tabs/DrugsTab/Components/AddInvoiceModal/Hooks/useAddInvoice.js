import { useState, useMemo } from "react";
import { useDrugs } from "../../../Contexts/DrugsContext";
import { ensureMedicineSupplierRecord, createMedicineInvoiceRecord } from "../../../Utils";
import { useFormDraft } from "../../../../../Hooks/useFormDraft";

const INIT_M = { name: "", units_count: "", unit_capacity: "", measurement_type: "مل", unit_price: "" };
const INIT_F = { supplier_id: "", new_supplier_name: "", paid_amount: "", payment_type: "cash", disease_id: "", medicines: [{ ...INIT_M }] };

export const useAddInvoice = (onClose) => {
  const { cycleId, rawData, notify, refetch } = useDrugs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(INIT_F);
  const draft = useFormDraft({ draftKey: `draft_drugs_${cycleId}`, initialState: INIT_F, form, setForm, onClose, notify });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleAddItem = () => setForm((p) => ({ ...p, medicines: [...p.medicines, { ...INIT_M }] }));
  const handleRemoveItem = (idx) => setForm((p) => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
  const handleUpdateItem = (idx, f, v) => setForm((p) => ({ ...p, medicines: p.medicines.map((m, i) => (i === idx ? { ...m, [f]: v } : m)) }));

  const totalPrice = useMemo(() => form.medicines.reduce((acc, m) => acc + (parseFloat(m.units_count) || 0) * (parseFloat(m.unit_price) || 0), 0), [form.medicines]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paid = parseFloat(form.paid_amount) || 0;
    if (form.medicines.some((m) => !m.name.trim())) return notify("يرجى إدخال اسم الدواء لجميع الأصناف", "error");
    if (paid > totalPrice && totalPrice > 0) return notify(`المبلغ المدفوع (${paid}) لا يمكن أن يتجاوز الإجمالي (${totalPrice})`, "error");
    if (paid < 0) return notify("المبلغ المدفوع لا يمكن أن يكون سالباً", "error");

    setIsSubmitting(true);
    try {
      const supplierId = await ensureMedicineSupplierRecord(form.supplier_id, form.new_supplier_name);
      await createMedicineInvoiceRecord({ cycle_id: cycleId, supplier_id: supplierId, total_price: totalPrice, ...form });
      draft.clearDraft();
      notify("تم تسجيل فاتورة الأدوية بنجاح!");
      if (refetch) refetch();
      onClose();
    } catch (err) {
      notify("فشل تسجيل الفاتورة: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleAddItem, handleRemoveItem, handleUpdateItem, handleSubmit, totalPrice, suppliers: rawData?.medicineSuppliers || [], diseases: rawData?.diseases || [], draft };
};
export default useAddInvoice;
