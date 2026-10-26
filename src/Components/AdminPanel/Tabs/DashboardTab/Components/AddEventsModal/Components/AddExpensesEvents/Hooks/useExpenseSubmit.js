import { useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord, createExpenseRecord } from "../../../Utils";

export const useExpenseSubmit = () => {
  const { day, cycleId, user, generalInfo, notify, refetch, tabForms, setTabForms, clearDraft } = useEvents();
  const form = tabForms.expenses;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTabForms((p) => ({ ...p, expenses: { ...p.expenses, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount) || 0;
    if (!form.expense_item.trim()) return notify("يرجى إدخال بند المصروف", "error");
    if (amount <= 0) return notify("يرجى إدخال مبلغ صحيح أكبر من صفر", "error");

    setIsSubmitting(true);
    try {
      const dayId = await ensureDayRecord(day, cycleId);
      const eventId = await createEventRecord({
        parent_day_id: dayId,
        temperature_inside: generalInfo.temperature,
        deaths: generalInfo.deaths,
        death_reason: generalInfo.deathReason,
        performed_by: user?.id,
      });
      await createExpenseRecord({ parent_event_id: eventId, ...form });
      notify("تم تسجيل المصروف بنجاح!");
      setTabForms((p) => ({ ...p, expenses: { expense_item: "", amount: "", payment_type: "cash" } }));
      if (clearDraft) clearDraft();
      if (refetch) refetch();
    } catch (err) {
      notify("فشل تسجيل المصروف: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit };
};
