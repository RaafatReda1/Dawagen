import { useState } from "react";
import { useFeed } from "../../../Contexts/FeedContext";
import { ensureSupplierRecord, createFeedShipmentRecord } from "../../../Utils";
import { useFormDraft } from "../../../../../Hooks/useFormDraft";

const INITIAL_FORM = {
  supplier_id: "", new_supplier_name: "", feed_name: "",
  sacks_count: "", sack_weight: "", sack_price: "", paid_amount: "", payment_type: "",
};

export const useAddShipment = (onClose) => {
  const { cycleId, rawData, notify, refetch } = useFeed();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const draft = useFormDraft({
    draftKey: `draft_feed_${cycleId}`, initialState: INITIAL_FORM, form, setForm, onClose, notify,
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalCost = (parseFloat(form.sacks_count) || 0) * (parseFloat(form.sack_price) || 0);
    const paid = parseFloat(form.paid_amount) || 0;
    if (!form.sacks_count || Number(form.sacks_count) <= 0) return notify("يرجى إدخال عدد الشكائر", "error");
    if (paid > totalCost && totalCost > 0) return notify(`المبلغ المدفوع (${paid} ج.م) لا يمكن أن يتجاوز إجمالي الشحنة (${totalCost} ج.م)`, "error");
    if (paid < 0) return notify("المبلغ المدفوع لا يمكن أن يكون سالباً", "error");

    setIsSubmitting(true);
    try {
      const supplierId = await ensureSupplierRecord(form.supplier_id, form.new_supplier_name);
      await createFeedShipmentRecord({ ...form, cycle_id: cycleId, supplier_id: supplierId });
      draft.clearDraft();
      notify("تم إضافة شحنة العلف بنجاح!");
      if (refetch) refetch();
      onClose();
    } catch (err) {
      notify("فشل تسجيل الشحنة: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit, suppliers: rawData?.feedSuppliers || [], draft };
};
