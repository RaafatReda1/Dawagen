import { useState } from "react";
import { useFeed } from "../../../Contexts/FeedContext";
import { ensureSupplierRecord, createFeedShipmentRecord } from "../../../Utils";

export const useAddShipment = (onClose) => {
  const { cycleId, rawData, notify, refetch } = useFeed();
  const suppliers = rawData?.feedSuppliers || [];

  const [form, setForm] = useState({
    supplier_id: "",
    new_supplier_name: "",
    feed_name: "",
    sacks_count: "",
    sack_weight: "",
    sack_price: "",
    paid_amount: "",
    payment_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sacks_count || Number(form.sacks_count) <= 0) {
      return notify("يرجى إدخال عدد الشكائر", "error");
    }
    setIsSubmitting(true);
    try {
      const supplierId = await ensureSupplierRecord(form.supplier_id, form.new_supplier_name);
      await createFeedShipmentRecord({ cycle_id: cycleId, supplier_id: supplierId, ...form });
      notify("تم إضافة شحنة العلف بنجاح!");
      if (refetch) refetch();
      if (onClose) onClose();
    } catch (err) {
      notify("فشل تسجيل الشحنة: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit, suppliers };
};
