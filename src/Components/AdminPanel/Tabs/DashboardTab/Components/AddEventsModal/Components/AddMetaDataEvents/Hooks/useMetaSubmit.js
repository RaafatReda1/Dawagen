import { useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createMetaDataRecord, createFollowUpRecord } from "../../../Utils";

export const useMetaSubmit = () => {
  const { day, cycleId, notify, refetch } = useEvents();
  const [weights, setWeights] = useState({ small: "", medium: "", large: "", sample: "" });
  const [meta, setMeta] = useState({ name: "", value: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWeightChange = (e) => setWeights((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleMetaChange = (e) => setMeta((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      setWeights({ small: "", medium: "", large: "", sample: "" });
      setMeta({ name: "", value: "" });
      if (refetch) refetch();
    } catch (err) {
      notify("فشل حفظ البيانات: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { weights, meta, isSubmitting, handleWeightChange, handleMetaChange, handleSubmit };
};
