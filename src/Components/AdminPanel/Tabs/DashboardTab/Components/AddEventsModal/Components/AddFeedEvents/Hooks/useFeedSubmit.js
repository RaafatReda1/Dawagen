import { useEffect, useState } from "react";
import { useEvents } from "../../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord, createFeedWithdrawRecord } from "../../../Utils";

export const useFeedSubmit = () => {
  const { day, cycleId, user, rawData, generalInfo, notify, refetch, tabForms, setTabForms, clearDraft } = useEvents();
  const shipments = rawData?.feedShipments || [];
  const lastShipment = shipments[shipments.length - 1];
  const form = tabForms.feed;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!form.food_id && lastShipment) {
      setTabForms((p) => ({ ...p, feed: { ...p.feed, food_id: String(lastShipment.id) } }));
    }
  }, [lastShipment, form.food_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTabForms((p) => ({ ...p, feed: { ...p.feed, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activeFoodId = form.food_id || lastShipment?.id;
    if (!activeFoodId) return notify("لا توجد شحنة علف محددة. لا يمكن تسجيل السحب.", "error");
    if (!form.sacks_consumed || parseFloat(form.sacks_consumed) <= 0) {
      return notify("يرجى إدخال عدد الشكائر المسحوبة", "error");
    }
    setIsSubmitting(true);
    try {
      const dayId = await ensureDayRecord(day, cycleId);
      const eventId = await createEventRecord({ parent_day_id: dayId, ...generalInfo, performed_by: user?.id });
      await createFeedWithdrawRecord({ parent_event_id: eventId, ...form, food_id: activeFoodId });
      notify("تم تسجيل سحب العلف بنجاح!");
      setTabForms((p) => ({ ...p, feed: { ...p.feed, sacks_consumed: "" } }));
      if (clearDraft) clearDraft();
      if (refetch) refetch();
    } catch (err) {
      notify("فشل تسجيل سحب العلف: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, handleChange, handleSubmit, shipments };
};
