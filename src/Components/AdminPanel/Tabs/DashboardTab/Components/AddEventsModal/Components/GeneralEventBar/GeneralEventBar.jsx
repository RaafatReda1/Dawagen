import { useEvents } from "../../Contexts/EventsContext";
import { ensureDayRecord, createEventRecord } from "../../Utils";
import GeneralEventInputs from "./Components/GeneralEventInputs/GeneralEventInputs";
import styles from "./GeneralEventBar.module.css";

const GeneralEventBar = () => {
  const { day, cycleId, user, rawData, generalInfo, setGeneralInfo, notify, refetch } =
    useEvents();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const dayId = await ensureDayRecord(day, cycleId);
      await createEventRecord({
        parent_day_id: dayId,
        temperature_inside: generalInfo.temperature,
        deaths: generalInfo.deaths,
        death_reason: generalInfo.deathReason,
        performed_by: user?.id,
      });
      notify("تم حفظ بيانات اليوم بنجاح!");
      if (refetch) refetch();
    } catch (err) {
      notify("فشل حفظ القراءات: " + err.message, "error");
    }
  };

  return (
    <div className={styles.bar}>
      <GeneralEventInputs
        generalInfo={generalInfo}
        onChange={handleChange}
        diseases={rawData?.diseases}
      />
      <button type="button" className={styles.saveBtn} onClick={handleSave}>
        حفظ
      </button>
    </div>
  );
};

export default GeneralEventBar;
