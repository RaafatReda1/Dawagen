import { useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord, createDrugWithdrawRecord } from "../../../Utils";

export const useDrugSubmit = () => {
  const { day, cycleId, user, generalInfo, notify, refetch, tabForms, setTabForms, clearDraft } = useEvents();
  const form = tabForms.drugs;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTabForms((p) => ({ ...p, drugs: { ...p.drugs, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.drug_id) return notify("يرجى اختيار الدواء المطلوب", "error");
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
      await createDrugWithdrawRecord({ parent_event_id: eventId, ...form });
      notify("تم تسجيل سحب الدواء بنجاح!");
      setTabForms((p) => ({ ...p, drugs: { drug_id: "", packages_count: "", consumed_capacity: "", disease_id: "" } }));
      if (clearDraft) clearDraft();
      if (refetch) refetch();
    } catch (err) {
      notify("فشل تسجيل سحب الدواء: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit };
};
