import { useEvents } from "../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord } from "../../Utils";
import GeneralEventInputs from "./Components/GeneralEventInputs/GeneralEventInputs";
import styles from "./GeneralEventBar.module.css";

const GeneralEventBar = () => {
  const { day, cycleId, user, rawData, generalInfo, setGeneralInfo, notify, refetch, clearDraft } = useEvents();

  const handleChange = (e) => setGeneralInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    const temp = parseFloat(generalInfo.temperature);
    const deaths = parseInt(generalInfo.deaths, 10);
    if (generalInfo.temperature && (temp < 10 || temp > 50)) {
      return notify("درجة الحرارة يجب أن تكون بين 10° و 50° مئوية", "error");
    }
    if (generalInfo.deaths && deaths < 0) return notify("عدد النافق لا يمكن أن يكون سالباً", "error");

    try {
      const dayId = await ensureDayRecord(day, cycleId);
      await createEventRecord({
        parent_day_id: dayId,
        temperature_inside: generalInfo.temperature,
        deaths: generalInfo.deaths,
        death_reason: generalInfo.deathReason,
        performed_by: user?.id,
      });
      notify("تم حفظ قراءات اليوم بنجاح!");
      if (clearDraft) clearDraft();
      if (refetch) refetch();
    } catch (err) {
      notify("فشل حفظ القراءات: " + err.message, "error");
    }
  };

  return (
    <div className={styles.bar}>
      <GeneralEventInputs generalInfo={generalInfo} onChange={handleChange} diseases={rawData?.diseases} />
      <button type="button" className={styles.saveBtn} onClick={handleSave}>حفظ</button>
    </div>
  );
};

export default GeneralEventBar;
