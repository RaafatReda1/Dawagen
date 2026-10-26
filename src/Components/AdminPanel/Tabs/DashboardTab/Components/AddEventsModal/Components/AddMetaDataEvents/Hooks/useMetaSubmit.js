import { useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createMetaDataRecord, createFollowUpRecord } from "../../../Utils";

export const useMetaSubmit = () => {
  const { day, cycleId, notify, refetch, tabForms, setTabForms, clearDraft } = useEvents();
  const weights = tabForms.meta.weights;
  const meta = { name: tabForms.meta.name, value: tabForms.meta.value };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setTabForms((p) => ({ ...p, meta: { ...p.meta, weights: { ...p.meta.weights, [name]: value } } }));
  };

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setTabForms((p) => ({ ...p, meta: { ...p.meta, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dayId = await ensureDayRecord(day, cycleId);
      if (weights.small || weights.medium || weights.large || weights.sample) {
        await createFollowUpRecord({ parent_day_id: dayId, ...weights, wight_random_sample: weights.sample });
      }
      if (meta.name && meta.value) {
        await createMetaDataRecord({ parent_day_id: dayId, meta_name: meta.name, meta_value: meta.value });
      }
      notify("تم حفظ بيانات الملاحظات والأوزان بنجاح!");
      setTabForms((p) => ({ ...p, meta: { weights: { small: "", medium: "", large: "", sample: "" }, name: "", value: "" } }));
      if (clearDraft) clearDraft();
      if (refetch) refetch();
    } catch (err) {
      notify("فشل حفظ البيانات: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { weights, meta, isSubmitting, handleWeightChange, handleMetaChange, handleSubmit };
};
