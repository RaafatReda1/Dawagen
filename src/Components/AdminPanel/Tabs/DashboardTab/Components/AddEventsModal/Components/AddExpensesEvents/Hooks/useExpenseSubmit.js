import { useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord, createExpenseRecord } from "../../../Utils";

export const useExpenseSubmit = () => {
  const { day, cycleId, user, generalInfo, notify, refetch } = useEvents();
  const [form, setForm] = useState({
    expense_item: "",
    amount: "",
    payment_type: "cash",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await createExpenseRecord({
        parent_event_id: eventId,
        ...form,
      });
      notify("تم تسجيل المصروف بنجاح!");
      setForm({ expense_item: "", amount: "", payment_type: "cash" });
      if (refetch) refetch();
    } catch (err) {
      notify("فشل تسجيل المصروف: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit };
};
